<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\IncomingItem;
use App\Models\OutgoingItem;
use App\Models\ItemRequest;
use App\Models\Item;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the inventory dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get statistics
        $stats = [
            'total_items' => Item::count(),
            'total_stock' => Item::sum('stock_quantity'),
            'incoming_items_today' => IncomingItem::whereDate('created_at', today())->count(),
            'outgoing_items_today' => OutgoingItem::whereDate('created_at', today())->count(),
            'pending_requests' => ItemRequest::where('status', 'pending')->count(),
            'total_users' => User::count(),
        ];

        // Get recent activities based on user role
        $recentActivities = [];
        
        if ($user->canManageInventory()) {
            $recentActivities = [
                'incoming' => IncomingItem::with(['item', 'creator'])
                    ->latest()
                    ->take(5)
                    ->get(),
                'outgoing' => OutgoingItem::with(['item', 'creator'])
                    ->latest()
                    ->take(5)
                    ->get(),
                'requests' => ItemRequest::with(['item', 'user'])
                    ->latest()
                    ->take(5)
                    ->get(),
            ];
        } else {
            $recentActivities = [
                'requests' => ItemRequest::with(['item', 'approver'])
                    ->where('user_id', $user->id)
                    ->latest()
                    ->take(10)
                    ->get(),
            ];
        }

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'activities' => $recentActivities,
            'userRole' => $user->role,
        ]);
    }
}