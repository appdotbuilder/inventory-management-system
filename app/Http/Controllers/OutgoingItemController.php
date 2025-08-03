<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOutgoingItemRequest;
use App\Models\OutgoingItem;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OutgoingItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = OutgoingItem::with(['item', 'creator']);

        // Apply filters
        if ($request->filled('search')) {
            $query->whereHas('item', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('code', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('site')) {
            $query->where('site', $request->site);
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

        $outgoingItems = $query->latest()->paginate(15);

        return Inertia::render('outgoing-items/index', [
            'outgoingItems' => $outgoingItems,
            'filters' => $request->only(['search', 'site', 'no_sj', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $items = Item::where('stock_quantity', '>', 0)->get();

        return Inertia::render('outgoing-items/create', [
            'items' => $items,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOutgoingItemRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = $request->user()->id;

        $item = Item::find($data['item_id']);
        
        // Check sufficient stock
        if (!$item->hasSufficientStock($data['quantity'])) {
            return redirect()->back()
                ->with('error', 'Insufficient stock for this item.')
                ->withInput();
        }

        $outgoingItem = OutgoingItem::create($data);

        // Decrease stock
        $item->decreaseStock($data['quantity']);

        return redirect()->route('outgoing-items.show', $outgoingItem)
            ->with('success', 'Outgoing item recorded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(OutgoingItem $outgoingItem)
    {
        $outgoingItem->load(['item', 'creator']);

        return Inertia::render('outgoing-items/show', [
            'outgoingItem' => $outgoingItem,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OutgoingItem $outgoingItem)
    {
        // Increase stock back
        $outgoingItem->item->increaseStock($outgoingItem->quantity);
        
        $outgoingItem->delete();

        return redirect()->route('outgoing-items.index')
            ->with('success', 'Outgoing item deleted successfully.');
    }
}