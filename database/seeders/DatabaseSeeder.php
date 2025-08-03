<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Supplier;
use App\Models\Item;
use App\Models\ItemRequest;
use App\Models\IncomingItem;
use App\Models\OutgoingItem;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin users
        $superadmin = User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@inventory.com',
            'password' => bcrypt('password'),
            'role' => 'superadmin',
            'nip' => '12345678',
            'nik' => '1234567890123456',
            'alamat' => '123 Admin Street, Jakarta',
            'no_hp' => '081234567890',
            'divisi' => 'IT Management',
            'email_verified_at' => now(),
        ]);

        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@inventory.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'nip' => '87654321',
            'nik' => '6543210987654321',
            'alamat' => '456 Manager Lane, Jakarta',
            'no_hp' => '081234567891',
            'divisi' => 'Inventory Management',
            'email_verified_at' => now(),
        ]);

        $user = User::create([
            'name' => 'Regular User',
            'email' => 'user@inventory.com',
            'password' => bcrypt('password'),
            'role' => 'user',
            'nip' => '11223344',
            'nik' => '1122334455667788',
            'alamat' => '789 User Avenue, Jakarta',
            'no_hp' => '081234567892',
            'divisi' => 'Operations',
            'email_verified_at' => now(),
        ]);

        // Create sample categories
        $categories = [
            ['name' => 'Office Supplies', 'description' => 'General office equipment and supplies'],
            ['name' => 'Construction Materials', 'description' => 'Building and construction materials'],
            ['name' => 'Electronics', 'description' => 'Electronic devices and components'],
            ['name' => 'Safety Equipment', 'description' => 'Safety and protective equipment'],
            ['name' => 'Tools & Equipment', 'description' => 'Hand tools and machinery'],
        ];

        foreach ($categories as $categoryData) {
            Category::create($categoryData);
        }

        // Create sample suppliers
        $suppliers = [
            [
                'name' => 'PT Maju Bersama',
                'contact_person' => 'John Doe',
                'phone' => '021-12345678',
                'email' => 'sales@majubersama.com',
                'address' => 'Jl. Industri No. 123, Jakarta',
            ],
            [
                'name' => 'CV Sukses Mandiri',
                'contact_person' => 'Jane Smith',
                'phone' => '021-87654321',
                'email' => 'info@suksesmandiri.com',
                'address' => 'Jl. Perdagangan No. 456, Bekasi',
            ],
            [
                'name' => 'Toko Serba Ada',
                'contact_person' => 'Ahmad Rahman',
                'phone' => '021-11223344',
                'email' => 'toko@serba-ada.com',
                'address' => 'Jl. Pasar Baru No. 789, Tangerang',
            ],
        ];

        foreach ($suppliers as $supplierData) {
            Supplier::create($supplierData);
        }

        // Create sample items
        $categories = Category::all();
        $suppliers = Supplier::all();

        $items = [
            [
                'code' => 'CNS0001',
                'name' => 'A4 Paper',
                'type' => 'consumable',
                'category_id' => $categories->where('name', 'Office Supplies')->first()->id,
                'supplier_id' => $suppliers->first()->id,
                'unit' => 'ream',
                'stock_quantity' => 50,
                'description' => 'High quality A4 paper for printing',
            ],
            [
                'code' => 'RAW0001',
                'name' => 'Steel Rebar',
                'type' => 'raw_material',
                'category_id' => $categories->where('name', 'Construction Materials')->first()->id,
                'supplier_id' => $suppliers->skip(1)->first()->id,
                'unit' => 'meter',
                'size' => '12mm',
                'stock_quantity' => 200,
                'description' => '12mm steel rebar for construction',
            ],
            [
                'code' => 'MAT0001',
                'name' => 'Safety Helmet',
                'type' => 'material',
                'category_id' => $categories->where('name', 'Safety Equipment')->first()->id,
                'supplier_id' => $suppliers->last()->id,
                'unit' => 'pcs',
                'stock_quantity' => 25,
                'description' => 'Standard safety helmet for construction workers',
            ],
        ];

        foreach ($items as $itemData) {
            Item::create($itemData);
        }

        // Create additional sample data using factories
        Category::factory(5)->create();
        Supplier::factory(5)->create();
        Item::factory(30)->create();

        // Create some item requests
        $items = Item::all();
        $users = User::whereIn('role', ['user', 'admin'])->get();

        foreach (range(1, 15) as $i) {
            ItemRequest::create([
                'user_id' => $users->random()->id,
                'item_id' => $items->random()->id,
                'quantity' => random_int(1, 10),
                'unit' => $items->random()->unit,
                'status' => $this->faker()->randomElement(['pending', 'approved', 'rejected']),
                'notes' => $this->faker()->sentence(),
                'approved_by' => $this->faker()->boolean() ? $admin->id : null,
                'approved_at' => $this->faker()->boolean() ? $this->faker()->dateTimeBetween('-1 month', 'now') : null,
            ]);
        }

        // Create some incoming items
        foreach (range(1, 10) as $i) {
            IncomingItem::create([
                'no_sj' => 'SJ' . str_pad((string) $i, 4, '0', STR_PAD_LEFT),
                'no_rkm' => 'RKM' . str_pad((string) $i, 4, '0', STR_PAD_LEFT),
                'item_id' => $items->random()->id,
                'quantity' => random_int(10, 100),
                'unit' => $items->random()->unit,
                'created_by' => $admin->id,
            ]);
        }

        // Create some outgoing items
        foreach (range(1, 8) as $i) {
            OutgoingItem::create([
                'no_sj' => 'OUT' . str_pad((string) $i, 4, '0', STR_PAD_LEFT),
                'site' => $this->faker()->randomElement(['project_a', 'project_b', 'project_c']),
                'item_id' => $items->random()->id,
                'quantity' => random_int(5, 50),
                'unit' => $items->random()->unit,
                'created_by' => $admin->id,
            ]);
        }
    }

    protected function faker()
    {
        return \Faker\Factory::create();
    }
}