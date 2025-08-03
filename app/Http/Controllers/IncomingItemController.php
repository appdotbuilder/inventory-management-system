<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreIncomingItemRequest;
use App\Models\IncomingItem;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IncomingItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = IncomingItem::with(['item', 'creator']);

        // Apply filters
        if ($request->filled('search')) {
            $query->whereHas('item', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('code', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('no_sj')) {
            $query->where('no_sj', 'like', '%' . $request->no_sj . '%');
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $incomingItems = $query->latest()->paginate(15);

        return Inertia::render('incoming-items/index', [
            'incomingItems' => $incomingItems,
            'filters' => $request->only(['search', 'no_sj', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $items = Item::all();

        return Inertia::render('incoming-items/create', [
            'items' => $items,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreIncomingItemRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = $request->user()->id;

        $incomingItem = IncomingItem::create($data);

        // Increase stock
        $incomingItem->item->increaseStock($data['quantity']);

        return redirect()->route('incoming-items.show', $incomingItem)
            ->with('success', 'Incoming item recorded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(IncomingItem $incomingItem)
    {
        $incomingItem->load(['item', 'creator']);

        return Inertia::render('incoming-items/show', [
            'incomingItem' => $incomingItem,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(IncomingItem $incomingItem)
    {
        // Decrease stock back
        $incomingItem->item->decreaseStock($incomingItem->quantity);
        
        $incomingItem->delete();

        return redirect()->route('incoming-items.index')
            ->with('success', 'Incoming item deleted successfully.');
    }
}