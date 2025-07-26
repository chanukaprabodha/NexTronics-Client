import React, { useEffect, useState } from "react";
import {
    BarChart3,
    Heart,
    HelpCircle,
    Home,
    LayoutDashboard,
    Package,
    Settings,
    ShoppingCart,
    Users,
    X
} from 'lucide-react';
import {useLocation, useNavigate} from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const [role, setRole] = useState<string | null>(null);

    const [activeSection, setActiveSection] = useState<string>("Dashboard"); // Default to "Dashboard"

    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        setRole(userRole);
    }, []);

    const adminNavigationItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/admin-dashboard' },
        { name: 'Products', icon: Package, href: '/manage-products' },
        { name: 'Orders', icon: ShoppingCart, href: '#' },
        { name: 'Customers', icon: Users, href: '#' },
        { name: 'Analytics', icon: BarChart3, href: '#' },
        { name: 'Settings', icon: Settings, href: '#' },
    ];

    const customerNavigationItems = [
        { id: 'Dashboard', label: 'Home', icon: Home, href: '/customer-dashboard' },
        { id: 'Orders', label: 'My Orders', icon: Package, href: '#' },
        { id: 'Wishlist', label: 'Wishlist', icon: Heart, href: '#' },
        { id: 'Account', label: 'Setting', icon: Settings, href: '#' },
        { id: 'Support', label: 'Support', icon: HelpCircle, href: '#' },
    ];

    const handleSectionChange = ( href: string) => {
        navigate(href);
    };

    return (
        <>
            <div className={`
                fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:static lg:inset-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                w-[250px] min-w-[250px] max-w-[250px] flex-shrink-0
            `}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">NexTronics</h1>
                    </div>
                    <button
                        className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                        onClick={() => { }}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {role === 'admin' && (
                    <nav className="mt-8">
                        <div className="px-4 space-y-2">
                            {adminNavigationItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.href;

                                return (
                                    <button
                                        key={item.name}
                                        onClick={() => handleSectionChange(item.href)}
                                        className={`
                                        w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                                        ${isActive
                                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        <Icon
                                            className={`mr-3 w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                        {item.name}
                                    </button>
                                );
                            })}
                        </div>
                    </nav>
                )}

                {role === 'customer' && (
                    <nav className="mt-8">
                        <div className="px-4 space-y-2">
                            {customerNavigationItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.href;

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleSectionChange(item.href)}
                                        className={`
                                        w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                                        ${isActive
                                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        <Icon
                                            className={`mr-3 w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>
                    </nav>
                )}
            </div>
        </>
    );
};

export default Sidebar;