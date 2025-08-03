<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreItemRequestRequest;
use App\Http\Requests\UpdateItemRequestRequest;
use App\Models\ItemRequest;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $query = ItemRequest::with(['item', 'user', 'approver']);

        // Filter based on user role
        if ($user->isUser()) {
            $query->where('user_id', $user->id);
        }

        // Apply filters
        if ($request->filled('search')) {
            $query->whereHas('item', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('code', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('user_id') && $user->canManageInventory()) {
            $query->where('user_id', $request->user_id);
        }

        $itemRequests = $query->latest()->paginate(15);

        return Inertia::render('item-requests/index', [
            'itemRequests' => $itemRequests,
            'filters' => $request->only(['search', 'status', 'user_id']),
            'canManage' => $user->canManageInventory(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $items = Item::where('stock_quantity', '>', 0)->get();

        return Inertia::render('item-requests/create', [
            'items' => $items,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequestRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        $itemRequest = ItemRequest::create($data);

        return redirect()->route('item-requests.show', $itemRequest)
            ->with('success', 'Item request submitted successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ItemRequest $itemRequest)
    {
        $itemRequest->load(['item', 'user', 'approver']);

        return Inertia::render('item-requests/show', [
            'itemRequest' => $itemRequest,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ItemRequest $itemRequest)
    {
        // Only allow editing pending requests by the owner
        if (!$itemRequest->isPending() || $itemRequest->user_id !== auth()->id()) {
            abort(403);
        }

        $items = Item::where('stock_quantity', '>', 0)->get();

        return Inertia::render('item-requests/edit', [
            'itemRequest' => $itemRequest,
            'items' => $items,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequestRequest $request, ItemRequest $itemRequest)
    {
        // Only allow updating pending requests by the owner
        if (!$itemRequest->isPending() || $itemRequest->user_id !== auth()->id()) {
            abort(403);
        }

        $itemRequest->update($request->validated());

        return redirect()->route('item-requests.show', $itemRequest)
            ->with('success', 'Item request updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ItemRequest $itemRequest)
    {
        // Only allow deleting pending requests by the owner or managers
        $user = auth()->user();
        if (!$itemRequest->isPending() || 
            ($itemRequest->user_id !== $user->id && !$user->canManageInventory())) {
            abort(403);
        }

        $itemRequest->delete();

        return redirect()->route('item-requests.index')
            ->with('success', 'Item request deleted successfully.');
    }
}