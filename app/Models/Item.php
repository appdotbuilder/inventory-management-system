<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Item
 *
 * @property int $id
 * @property string $code
 * @property string $name
 * @property string $type
 * @property int $category_id
 * @property int|null $supplier_id
 * @property string $unit
 * @property string|null $size
 * @property int $stock_quantity
 * @property string|null $photo
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Category $category
 * @property-read \App\Models\Supplier|null $supplier
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\IncomingItem> $incomingItems
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\OutgoingItem> $outgoingItems
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ItemRequest> $itemRequests
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Item newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Item newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Item query()
 * @method static \Database\Factories\ItemFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Item extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'code',
        'name',
        'type',
        'category_id',
        'supplier_id',
        'unit',
        'size',
        'stock_quantity',
        'photo',
        'description',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'stock_quantity' => 'integer',
    ];

    /**
     * Get the category that owns the item.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the supplier that owns the item.
     */
    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    /**
     * Get the incoming items for the item.
     */
    public function incomingItems(): HasMany
    {
        return $this->hasMany(IncomingItem::class);
    }

    /**
     * Get the outgoing items for the item.
     */
    public function outgoingItems(): HasMany
    {
        return $this->hasMany(OutgoingItem::class);
    }

    /**
     * Get the item requests for the item.
     */
    public function itemRequests(): HasMany
    {
        return $this->hasMany(ItemRequest::class);
    }

    /**
     * Increase stock quantity.
     */
    public function increaseStock(int $quantity): void
    {
        $this->increment('stock_quantity', $quantity);
    }

    /**
     * Decrease stock quantity.
     */
    public function decreaseStock(int $quantity): void
    {
        $this->decrement('stock_quantity', $quantity);
    }

    /**
     * Check if item has sufficient stock.
     */
    public function hasSufficientStock(int $quantity): bool
    {
        return $this->stock_quantity >= $quantity;
    }
}