import React from 'react';

interface Order {
    id: string;
    customer: string;
    date: string;
    status: 'completed' | 'pending' | 'cancelled';
    total: string;
}

const RecentOrders: React.FC = () => {
    const orders: Order[] = [
        {
            id: '#12547',
            customer: 'Sarah Wilson',
            date: '2024-01-15',
            status: 'completed',
            total: '$129.99',
        },
        {
            id: '#12546',
            customer: 'Mike Johnson',
            date: '2024-01-15',
            status: 'pending',
            total: '$89.50',
        },
        {
            id: '#12545',
            customer: 'Emily Davis',
            date: '2024-01-14',
            status: 'completed',
            total: '$259.99',
        },
        {
            id: '#12544',
            customer: 'David Brown',
            date: '2024-01-14',
            status: 'cancelled',
            total: '$45.00',
        },
        {
            id: '#12543',
            customer: 'Lisa Anderson',
            date: '2024-01-13',
            status: 'completed',
            total: '$199.99',
        },
    ];

    const getStatusBadge = (status: Order['status']) => {
        const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';

        switch (status) {
            case 'completed':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            case 'cancelled':
                return `${baseClasses} bg-red-100 text-red-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                <tr className="border-b border-gray-200">
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                        Order ID
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                        Customer
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3 hidden sm:table-cell">
                        Date
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                        Status
                    </th>
                    <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                        Total
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="py-4 text-sm font-medium text-blue-600">
                            {order.id}
                        </td>
                        <td className="py-4 text-sm text-gray-900">
                            {order.customer}
                        </td>
                        <td className="py-4 text-sm text-gray-500 hidden sm:table-cell">
                            {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="py-4">
                <span className={getStatusBadge(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900 text-right">
                            {order.total}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecentOrders;