import React from 'react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';

interface Item {
    id: number;
    code: string;
    name: string;
    type: string;
    stock_quantity: number;
    unit: string;
    category: {
        name: string;
    };
    supplier?: {
        name: string;
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    items: {
        data: Item[];
        links: PaginationLink[];
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
        };
    };
    categories: Array<{ id: number; name: string; }>;
    suppliers: Array<{ id: number; name: string; }>;
    filters: {
        search?: string;
        type?: string;
        category_id?: string;
    };
    [key: string]: unknown;
}

export default function ItemsIndex({ items, categories, filters }: Props) {
    const handleFilter = (key: string, value: string) => {
        router.get('/items', {
            ...filters,
            [key]: value,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'consumable': return '🧴';
            case 'raw_material': return '🔧';
            case 'material': return '⚙️';
            default: return '📦';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'consumable': return 'Consumable';
            case 'raw_material': return 'Raw Material';
            case 'material': return 'Material';
            default: return type;
        }
    };

    const getStockStatus = (quantity: number) => {
        if (quantity === 0) return { color: 'text-red-600 bg-red-100', label: 'Out of Stock' };
        if (quantity < 10) return { color: 'text-yellow-600 bg-yellow-100', label: 'Low Stock' };
        return { color: 'text-green-600 bg-green-100', label: 'In Stock' };
    };

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading title="📦 Item Management" />
                    <Link href="/items/create">
                        <Button>
                            ➕ Add New Item
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Search Items
                            </label>
                            <input
                                type="text"
                                placeholder="Search by name or code..."
                                value={filters.search || ''}
                                onChange={(e) => handleFilter('search', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Item Type
                            </label>
                            <select
                                value={filters.type || ''}
                                onChange={(e) => handleFilter('type', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Types</option>
                                <option value="consumable">Consumable</option>
                                <option value="raw_material">Raw Material</option>
                                <option value="material">Material</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                value={filters.category_id || ''}
                                onChange={(e) => handleFilter('category_id', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-end">
                            <Button
                                variant="outline"
                                onClick={() => router.get('/items')}
                                className="w-full"
                            >
                                🔄 Clear Filters
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Item Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Supplier
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Stock
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {items.data.map((item) => {
                                    const stockStatus = getStockStatus(item.stock_quantity);
                                    return (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Code: {item.code}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className="mr-2">{getTypeIcon(item.type)}</span>
                                                    <span className="text-sm text-gray-900">
                                                        {getTypeLabel(item.type)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.category.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.supplier?.name || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${stockStatus.color}`}>
                                                        {item.stock_quantity} {item.unit}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                <Link href={`/items/${item.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        👁️ View
                                                    </Button>
                                                </Link>
                                                <Link href={`/items/${item.id}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        ✏️ Edit
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {items.data.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📦</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
                            <p className="text-gray-500 mb-4">
                                {Object.keys(filters).some(key => filters[key as keyof typeof filters])
                                    ? 'Try adjusting your filters'
                                    : 'Get started by adding your first item'
                                }
                            </p>
                            <Link href="/items/create">
                                <Button>
                                    ➕ Add First Item
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {items.meta && items.meta.last_page > 1 && (
                    <div className="flex justify-center">
                        <div className="flex space-x-1">
                            {items.links.map((link: PaginationLink, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => link.url && router.get(link.url)}
                                    disabled={!link.url}
                                    className={`px-3 py-2 text-sm rounded-md ${
                                        link.active
                                            ? 'bg-blue-500 text-white'
                                            : link.url
                                            ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}