<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(['consumable', 'raw_material', 'material']);
        $prefix = match ($type) {
            'consumable' => 'CNS',
            'raw_material' => 'RAW',
            'material' => 'MAT',
            default => 'ITM',
        };

        return [
            'code' => $prefix . str_pad((string) $this->faker->unique()->numberBetween(1, 9999), 4, '0', STR_PAD_LEFT),
            'name' => $this->faker->words(3, true),
            'type' => $type,
            'category_id' => Category::factory(),
            'supplier_id' => $this->faker->boolean(80) ? Supplier::factory() : null,
            'unit' => $this->faker->randomElement(['pcs', 'kg', 'liter', 'meter', 'box', 'pack']),
            'size' => $type === 'raw_material' ? $this->faker->randomElement(['10mm', '12mm', '16mm', '20mm', '25mm']) : null,
            'stock_quantity' => $this->faker->numberBetween(0, 1000),
            'description' => $this->faker->sentence(),
        ];
    }
}