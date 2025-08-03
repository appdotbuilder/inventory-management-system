<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\OutgoingItem
 *
 * @property int $id
 * @property string $no_sj
 * @property string $site
 * @property int $item_id
 * @property int $quantity
 * @property string $unit
 * @property int $created_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Item $item
 * @property-read \App\Models\User $creator
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingItem query()

 * 
 * @mixin \Eloquent
 */
class OutgoingItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'no_sj',
        'site',
        'item_id',
        'quantity',
        'unit',
        'created_by',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantity' => 'integer',
    ];

    /**
     * Get the item that owns the outgoing item.
     */
    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }

    /**
     * Get the user who created the outgoing item.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}