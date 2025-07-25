import StatusCard from "../../component/StatusCard.tsx";
import SalesChart from "../../component/SalesChart.tsx";
import RecentOrders from "../../component/RecentOrders.tsx";
import React from "react";
import {DollarSign, ShoppingBag, Users} from "lucide-react";

export function AdminDashboard() {

    const stats = [
        {
            title: 'Total Sales',
            value: '$124,563',
            change: '+12.5%',
            changeType: 'increase' as const,
            icon: DollarSign,
        },
        {
            title: 'Total Orders',
            value: '1,429',
            change: '+8.2%',
            changeType: 'increase' as const,
            icon: ShoppingBag,
        },
        {
            title: 'Total Customers',
            value: '892',
            change: '+3.1%',
            changeType: 'increase' as const,
            icon: Users,
        },
    ];

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Welcome back! Here's what's happening with your store today.
                    </p>
                </div>

                {<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <StatusCard key={index} {...stat} />
                    ))}
                </div>}


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Sales Analytics</h3>
                            <select
                                className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                                <option>Last 7 days</option>
                                <option>Last 30 days</option>
                                <option>Last 90 days</option>
                            </select>
                        </div>
                        <SalesChart/>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                            <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                View All
                            </a>
                        </div>
                        <RecentOrders/>
                    </div>
                </div>
            </div>
        </>
    );
}