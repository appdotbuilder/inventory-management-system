import React from 'react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';

interface ItemRequest {
    id: number;
    quantity: number;
    unit: string;
    status: 'pending' | 'approved' | 'rejected';
    notes?: string;
    created_at: string;
    approved_at?: string;
    item: {
        name: string;
        code: string;
        type: string;
    };
    user: {
        name: string;
        divisi?: string;
    };
    approver?: {
        name: string;
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    itemRequests: {
        data: ItemRequest[];
        links: PaginationLink[];
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
        };
    };
    filters: {
        search?: string;
        status?: string;
        user_id?: string;
    };
    canManage: boolean;
    [key: string]: unknown;
}

export default function ItemRequestsIndex({ itemRequests, filters, canManage }: Props) {
    const handleFilter = (key: string, value: string) => {
        router.get('/item-requests', {
            ...filters,
            [key]: value,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };
        
        const icons = {
            pending: '⏳',
            approved: '✅',
            rejected: '❌',
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
                <span className="mr-1">{icons[status as keyof typeof icons]}</span>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'consumable': return '🧴';
            case 'raw_material': return '🔧';
            case 'material': return '⚙️';
            default: return '📦';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading title="📋 Item Requests" />
                    <Link href="/item-requests/create">
                        <Button>
                            ➕ New Request
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Search Items
                            </label>
                            <input
                                type="text"
                                placeholder="Search by item name or code..."
                                value={filters.search || ''}
                                onChange={(e) => handleFilter('search', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                value={filters.status || ''}
                                onChange={(e) => handleFilter('status', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <Button
                                variant="outline"
                                onClick={() => router.get('/item-requests')}
                                className="w-full"
                            >
                                🔄 Clear Filters
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Requests Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Item Details
                                    </th>
                                    {canManage && (
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Requested By
                                        </th>
                                    )}
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Quantity
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Request Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {itemRequests.data.map((request) => (
                                    <tr key={request.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="mr-3">{getTypeIcon(request.item.type)}</span>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {request.item.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Code: {request.item.code}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        {canManage && (
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {request.user.name}
                                                    </div>
                                                    {request.user.divisi && (
                                                        <div className="text-sm text-gray-500">
                                                            {request.user.divisi}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {request.quantity} {request.unit}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(request.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {formatDate(request.created_at)}
                                            </div>
                                            {request.approved_at && (
                                                <div className="text-xs text-gray-500">
                                                    Processed: {formatDate(request.approved_at)}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link href={`/item-requests/${request.id}`}>
                                                <Button variant="outline" size="sm">
                                                    👁️ View
                                                </Button>
                                            </Link>
                                            {request.status === 'pending' && (
                                                <>
                                                    {canManage ? (
                                                        <div className="inline-flex space-x-1">
                                                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                                ✅ Approve
                                                            </Button>
                                                            <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                                                                ❌ Reject
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <Link href={`/item-requests/${request.id}/edit`}>
                                                            <Button variant="outline" size="sm">
                                                                ✏️ Edit
                                                            </Button>
                                                        </Link>
                                                    )}
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {itemRequests.data.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
                            <p className="text-gray-500 mb-4">
                                {Object.keys(filters).some(key => filters[key as keyof typeof filters])
                                    ? 'Try adjusting your filters'
                                    : 'Submit your first item request'
                                }
                            </p>
                            <Link href="/item-requests/create">
                                <Button>
                                    ➕ Create First Request
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {itemRequests.meta && itemRequests.meta.last_page > 1 && (
                    <div className="flex justify-center">
                        <div className="flex space-x-1">
                            {itemRequests.links.map((link: PaginationLink, index: number) => (
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