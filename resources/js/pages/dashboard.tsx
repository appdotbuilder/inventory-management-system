import React from 'react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface Stats {
    total_items: number;
    total_stock: number;
    incoming_items_today: number;
    outgoing_items_today: number;
    pending_requests: number;
    total_users: number;
}

interface Activity {
    id: number;
    created_at: string;
    item?: {
        name: string;
        code: string;
    };
    user?: {
        name: string;
    };
    creator?: {
        name: string;
    };
    approver?: {
        name: string;
    };
    quantity?: number;
    status?: string;
    no_sj?: string;
    site?: string;
}

interface Activities {
    incoming?: Activity[];
    outgoing?: Activity[];
    requests?: Activity[];
}

interface Props {
    stats: Stats;
    activities: Activities;
    userRole: string;
    [key: string]: unknown;
}

export default function Dashboard({ stats, activities, userRole }: Props) {
    const canManageInventory = ['superadmin', 'admin'].includes(userRole);

    return (
        <AppShell>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <Heading title="📊 Inventory Dashboard" />
                    <div className="text-sm text-gray-600">
                        Role: <span className="font-medium capitalize">{userRole}</span>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">📦</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Items</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total_items.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">📈</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Stock</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total_stock.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    {canManageInventory && (
                        <>
                            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <span className="text-2xl">📥</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Incoming Today</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.incoming_items_today}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                            <span className="text-2xl">📤</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Outgoing Today</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.outgoing_items_today}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">⏳</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.pending_requests}</p>
                            </div>
                        </div>
                    </div>

                    {canManageInventory && (
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                        <span className="text-2xl">👥</span>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total_users}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {canManageInventory && (
                            <>
                                <Link href="/items/create">
                                    <Button className="w-full">
                                        ➕ Add New Item
                                    </Button>
                                </Link>
                                <Link href="/incoming-items/create">
                                    <Button variant="outline" className="w-full">
                                        📥 Record Incoming
                                    </Button>
                                </Link>
                                <Link href="/outgoing-items/create">
                                    <Button variant="outline" className="w-full">
                                        📤 Record Outgoing
                                    </Button>
                                </Link>
                            </>
                        )}
                        <Link href="/item-requests/create">
                            <Button variant="outline" className="w-full">
                                📋 Request Item
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Requests */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            📋 Recent {userRole === 'user' ? 'My' : ''} Requests
                        </h3>
                        <div className="space-y-3">
                            {activities.requests && activities.requests.length > 0 ? (
                                activities.requests.slice(0, 5).map((request) => (
                                    <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {request.item?.name} ({request.item?.code})
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                {userRole !== 'user' && `By: ${request.user?.name} • `}
                                                Qty: {request.quantity}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            request.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {request.status}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No recent requests</p>
                            )}
                        </div>
                        <div className="mt-4">
                            <Link href="/item-requests">
                                <Button variant="outline" size="sm" className="w-full">
                                    View All Requests
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Inventory Activities (Admin/Superadmin only) */}
                    {canManageInventory && (
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                📦 Recent Inventory Activities
                            </h3>
                            <div className="space-y-3">
                                {/* Incoming Items */}
                                {activities.incoming && activities.incoming.slice(0, 3).map((item) => (
                                    <div key={`in-${item.id}`} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                📥 {item.item?.name} ({item.item?.code})
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                SJ: {item.no_sj} • Qty: {item.quantity} • By: {item.creator?.name}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                
                                {/* Outgoing Items */}
                                {activities.outgoing && activities.outgoing.slice(0, 2).map((item) => (
                                    <div key={`out-${item.id}`} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                📤 {item.item?.name} ({item.item?.code})
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                To: {item.site?.replace('_', ' ')} • Qty: {item.quantity} • By: {item.creator?.name}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                
                                {(!activities.incoming?.length && !activities.outgoing?.length) && (
                                    <p className="text-gray-500 text-sm">No recent inventory activities</p>
                                )}
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <Link href="/incoming-items">
                                    <Button variant="outline" size="sm" className="w-full">
                                        View Incoming
                                    </Button>
                                </Link>
                                <Link href="/outgoing-items">
                                    <Button variant="outline" size="sm" className="w-full">
                                        View Outgoing
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}