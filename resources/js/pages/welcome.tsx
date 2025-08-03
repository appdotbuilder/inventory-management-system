import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { AppShell } from '@/components/app-shell';

export default function Welcome() {
    return (
        <AppShell>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                        <div className="text-center">
                            <h1 className="text-5xl font-bold text-gray-900 mb-6">
                                📦 Inventory Management System
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                                Streamline your inventory operations with our comprehensive management system. 
                                Track incoming items, manage stock levels, process item requests, and monitor outgoing inventory with ease.
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Link href="/login">
                                    <Button size="lg" className="px-8">
                                        🔐 Login to System
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button variant="outline" size="lg" className="px-8">
                                        📝 Create Account
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            🚀 Powerful Features for Every Role
                        </h2>
                        <p className="text-lg text-gray-600">
                            Role-based access control ensures the right people have the right permissions
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {/* Superadmin Features */}
                        <div className="bg-white rounded-xl shadow-md p-8 border-t-4 border-red-500">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">👑</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Superadmin</h3>
                                <p className="text-gray-600">Full System Control</p>
                            </div>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Complete inventory management
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    User management & role assignment
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Edit user profiles (NIP, NIK, etc.)
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    System configuration
                                </li>
                            </ul>
                        </div>

                        {/* Admin Features */}
                        <div className="bg-white rounded-xl shadow-md p-8 border-t-4 border-blue-500">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🛠️</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Admin</h3>
                                <p className="text-gray-600">Inventory Operations</p>
                            </div>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Manage incoming/outgoing items
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Approve/reject item requests
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Manage item categories & suppliers
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Stock level monitoring
                                </li>
                            </ul>
                        </div>

                        {/* User Features */}
                        <div className="bg-white rounded-xl shadow-md p-8 border-t-4 border-green-500">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">👤</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">User</h3>
                                <p className="text-gray-600">Request & Track</p>
                            </div>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Submit item requests
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Track request status
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    View personal request history
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Update profile information
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Key Features */}
                    <div className="bg-white rounded-xl shadow-md p-8 mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                            📊 Comprehensive Inventory Tracking
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📥</span>
                                </div>
                                <h4 className="font-semibold mb-2">Incoming Items</h4>
                                <p className="text-sm text-gray-600">Track deliveries with SJ & RKM numbers</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📋</span>
                                </div>
                                <h4 className="font-semibold mb-2">Item Requests</h4>
                                <p className="text-sm text-gray-600">Streamlined approval workflow</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📤</span>
                                </div>
                                <h4 className="font-semibold mb-2">Outgoing Items</h4>
                                <p className="text-sm text-gray-600">Monitor distribution to project sites</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📈</span>
                                </div>
                                <h4 className="font-semibold mb-2">Real-time Analytics</h4>
                                <p className="text-sm text-gray-600">Dashboard with live statistics</p>
                            </div>
                        </div>
                    </div>

                    {/* Item Types */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md p-8 text-white">
                        <h3 className="text-2xl font-bold mb-8 text-center">
                            🏷️ Three Distinct Item Categories
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🧴</span>
                                </div>
                                <h4 className="font-semibold mb-2">Consumables</h4>
                                <p className="text-sm opacity-90">Office supplies, cleaning materials, etc.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🔧</span>
                                </div>
                                <h4 className="font-semibold mb-2">Raw Materials</h4>
                                <p className="text-sm opacity-90">Construction materials with size specifications</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">⚙️</span>
                                </div>
                                <h4 className="font-semibold mb-2">Materials</h4>
                                <p className="text-sm opacity-90">General materials and equipment</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gray-900 text-white py-16">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h3 className="text-3xl font-bold mb-4">
                            Ready to Streamline Your Inventory? 🚀
                        </h3>
                        <p className="text-xl text-gray-300 mb-8">
                            Join our inventory management system and take control of your stock management today.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" className="px-8 bg-blue-600 hover:bg-blue-700">
                                    Get Started Now
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" size="lg" className="px-8 border-white text-white hover:bg-white hover:text-gray-900">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}