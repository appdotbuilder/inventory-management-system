<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ItemRequestController;
use App\Http\Controllers\ItemRequestApprovalController;
use App\Http\Controllers\IncomingItemController;
use App\Http\Controllers\OutgoingItemController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Items management
    Route::resource('items', ItemController::class);
    
    // Item requests
    Route::resource('item-requests', ItemRequestController::class);
    Route::post('item-requests/{itemRequest}/approval', [ItemRequestApprovalController::class, 'store'])
        ->name('item-requests.approval');
    
    // Incoming items (Admin/Superadmin only)
    Route::middleware([App\Http\Middleware\InventoryManagement::class])->group(function () {
        Route::resource('incoming-items', IncomingItemController::class)
            ->except(['edit', 'update']);
        Route::resource('outgoing-items', OutgoingItemController::class)
            ->except(['edit', 'update']);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
