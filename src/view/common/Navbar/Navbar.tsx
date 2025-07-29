import {useEffect, useState} from "react";
import {Bell, ChevronDown, LogOut, Menu, Package, Search, Settings, ShoppingCart, User} from "lucide-react";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert2";
import {useCart} from "../../../context/CartContext.tsx";
import {useDispatch} from "react-redux";
import {clearCart, setUserId} from "../../../slices/cartSlice.ts";

interface NavbarProps {
    onToggleSidebar: () => void;
    cartItemCount: number;
}

export function Navbar(onToggleSidebar, cartItemCount) {

    const dispatch = useDispatch();

    const [username, setUsername] = useState<string | null>(null);

    const [role, setRole] = useState<string | null>(null);

    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navigate = useNavigate();

    const {setIsOpen} = useCart();

    const handleLogout = () => {
        swal.fire({
            title: 'Are you sure?',
            text: "You want to log out?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("name");
                localStorage.removeItem("role");
                dispatch(clearCart());
                dispatch(setUserId(null));
                swal.fire({
                        icon: 'success',
                        title: 'Logged out successfully',
                        text: 'You have been logged out.',
                        timer: 1000
                    }
                );
                navigate("/login");
            }
        })
    }

    useEffect(() => {
        const storedUsername = localStorage.getItem("name");
        const storedRole = localStorage.getItem("role");
        setUsername(storedUsername);
        setRole(storedRole);
    }, []);

    return (

        <header className="bg-white shadow-sm border-b border-gray-200">
            {
                role === 'admin' && (
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center">
                            <button
                                onClick={onToggleSidebar}
                                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                            >
                                <Menu className="w-6 h-6"/>
                            </button>

                            <div className="hidden md:block ml-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="w-5 h-5 text-gray-400"/>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search products, customers, orders..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="md:hidden">
                                <button className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                                    <Search className="w-5 h-5"/>
                                </button>
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-3 p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-medium text-sm">{username?.charAt(0)}</span>
                                    </div>
                                    <div className="hidden md:block text-left">
                                        <p className="text-sm font-medium text-gray-900">{username}</p>
                                        <p className="text-xs text-gray-500">Administrator</p>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-gray-400"/>
                                </button>

                                {isProfileOpen && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                        <a href="#"
                                           className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <User className="mr-3 w-4 h-4"/>
                                            Your Profile
                                        </a>
                                        <a href="#"
                                           className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <Settings className="mr-3 w-4 h-4"/>
                                            Settings
                                        </a>
                                        <hr className="my-1"/>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <LogOut className="mr-3 w-4 h-4"/>
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }

            {/*Customer Navbar*/}
            {
                role === 'customer' && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Search Bar */}
                            <div className="hidden md:block flex-1 max-w-lg mx-8">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400"/>
                                    </div>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search products..."
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                    />
                                </div>
                            </div>

                            {/* Right side items */}
                            <div className="flex items-center space-x-4">
                                {/* Mobile search */}
                                <button className="md:hidden p-2 text-gray-400 hover:text-gray-500 transition-colors">
                                    <Search className="h-5 w-5"/>
                                </button>

                                {/* Cart */}
                                <button className="p-2 text-gray-400 hover:text-gray-500 transition-colors relative"
                                onClick={() => {
                                    setIsOpen(true)
                                }}>
                                    <ShoppingCart className="h-5 w-5"/>
                                    {cartItemCount > 0 && (
                                        <span
                                            className="absolute -top-1 -right-1 h-5 w-5 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center">
                            {cartItemCount}
                                </span>
                                    )}
                                </button>

                                {/* User Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center space-x-2 p-2 text-gray-700 hover:text-gray-900 transition-colors"
                                    >
                                        <div
                                            className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                            <span
                                                className="text-white font-medium text-sm">{username?.charAt(0)}</span>
                                        </div>
                                        <span className="hidden sm:block font-medium">{username}</span>
                                        <ChevronDown className="w-4 h-4"/>
                                    </button>

                                    {isDropdownOpen && (
                                        <div
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                            <a href="#"
                                               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center space-x-2">
                                                    <User className="w-4 h-4"/>
                                                    <span>My Account</span>
                                                </div>
                                            </a>
                                            <a href="#"
                                               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center space-x-2">
                                                    <Package className="w-4 h-4"/>
                                                    <span>My Orders</span>
                                                </div>
                                            </a>
                                            <a href="#"
                                               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center space-x-2">
                                                    <Settings className="w-4 h-4"/>
                                                    <span>Settings</span>
                                                </div>
                                            </a>
                                            <div className="border-t border-gray-100 mt-1 pt-1">
                                                <button
                                                    onClick={handleLogout}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                    <div className="flex items-center space-x-2">
                                                        <LogOut className="w-4 h-4"/>
                                                        <span>Logout</span>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </header>

    );
}