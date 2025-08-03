<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ItemRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemRequestApprovalController extends Controller
{
    /**
     * Approve an item request.
     */
    public function store(Request $request, ItemRequest $itemRequest)
    {
        $user = $request->user();
        
        // Only admins and superadmins can approve
        if (!$user->canManageInventory()) {
            abort(403);
        }

        // Check if request is pending
        if (!$itemRequest->isPending()) {
            return redirect()->back()
                ->with('error', 'This request has already been processed.');
        }

        $request->validate([
            'action' => 'required|in:approve,reject',
            'notes' => 'nullable|string|max:1000',
        ]);

        $action = $request->input('action');
        $notes = $request->input('notes');

        if ($action === 'approve') {
            // Check if item has sufficient stock
            if (!$itemRequest->item->hasSufficientStock($itemRequest->quantity)) {
                return redirect()->back()
                    ->with('error', 'Insufficient stock for this request.');
            }

            // Decrease stock
            $itemRequest->item->decreaseStock($itemRequest->quantity);
            
            $itemRequest->update([
                'status' => 'approved',
                'approved_by' => $user->id,
                'approved_at' => now(),
                'notes' => $notes,
            ]);

            $message = 'Item request approved successfully.';
        } else {
            $itemRequest->update([
                'status' => 'rejected',
                'approved_by' => $user->id,
                'approved_at' => now(),
                'notes' => $notes,
            ]);

            $message = 'Item request rejected successfully.';
        }

        return redirect()->route('item-requests.show', $itemRequest)
            ->with('success', $message);
    }
}