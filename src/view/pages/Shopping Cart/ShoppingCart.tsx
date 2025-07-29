import React, {useEffect, useState} from 'react';
import {Minus, Plus, ShoppingCart as ShoppingCartIcon, X} from 'lucide-react';
import {useCart} from "../../../context/CartContext.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {
    fetchCartData,
    removeFromCart,
    removeSelected,
    saveCartData,
    setUserId,
    updateQuantity
} from "../../../slices/cartSlice.ts";
import swal from "sweetalert2";
import {jwtDecode} from "jwt-decode";
import {initiatePayment} from "../../../slices/orderSlice.ts";
import {useNavigate} from "react-router-dom";

export const ShoppingCart = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    // Retrieve userId from token
    useEffect(() => {
        const token = localStorage.getItem('token'); // Replace with your token key
        if (token) {
            const decodedToken: { id: string } = jwtDecode(token);
            dispatch(setUserId(decodedToken.id)); // Set userId in Redux state
        }
    }, [dispatch]);

    const userId = useSelector((state: RootState) => state.cart.userId);

    useEffect(() => {
        if (userId) {
            dispatch(fetchCartData(userId));
        }
    }, [userId, dispatch]);

    const {isOpen, setIsOpen} = useCart();

    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

    // Fetch cart data from Redux
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

    // Calculate total items
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Handle quantity changes
    const increaseQuantity = (productId: string) => {
        dispatch(updateQuantity({productId, quantity: +1}));
        dispatch(saveCartData());
    };
    const decreaseQuantity = (productId: string) => {
        const item = cartItems.find(item => item.productId === productId);
        if (item && item.quantity <= 1) {
            swal.fire({
                title: 'Warning',
                text: 'Do you want to remove the item?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(removeFromCart(productId));
                    dispatch(saveCartData());
                }
            });
        } else {
            dispatch(updateQuantity({productId, quantity: -1}));
            dispatch(saveCartData());
        }
    };

    // Handle item selection
    const handleItemSelect = (id: string) => {
        const newSelected = new Set(selectedItems);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedItems(newSelected);
    };

    // Handle remove selected items
    const handleRemoveSelected = () => {
        const itemsToRemove = Array.from(selectedItems); // Convert Set to Array
        swal.fire({
            title: 'Are you sure?',
            text: `You are about to remove ${itemsToRemove.length} item(s) from your cart.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove',
            cancelButtonText: 'No, cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeSelected(itemsToRemove));
                dispatch(saveCartData());
                setSelectedItems(new Set());
                swal.fire({
                    icon: 'success',
                    title: 'Removed',
                    text: `${itemsToRemove.length} item(s) removed from your cart.`,
                    timer: 1500
                });
            }
        })
    };

    // Placeholder handlers
    const handleCheckout = () => {
        const selectedCartItems = cartItems.filter((item) => selectedItems.has(item.productId));
        if (selectedCartItems.length === 0) {
            alert("No items selected for checkout!");
            return;
        }
        setIsOpen(false);
        navigate("/checkout", { state: { selectedItems: selectedCartItems, userId: userId } });    }

const handleContinueShopping = () => {
    setIsOpen(false);
    alert('Redirecting to shopping page...');
};

return (
    <div>
        {/* Overlay */}
        {isOpen && (
            <div
                className="fixed inset-0 backdrop-blur-sm z-40 transition-opacity duration-300"
                onClick={() => setIsOpen(false)}
            />
        )}

        {/* Cart Drawer */}
        <div
            className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            } flex flex-col`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
                <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
                <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
                >
                    <X size={20}/>
                </button>
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-b border-gray-200 flex gap-3">
                <button
                    onClick={handleCheckout}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                    Checkout
                </button>
                <button
                    onClick={handleRemoveSelected}
                    disabled={selectedItems.size === 0}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                        selectedItems.size === 0
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                >
                    Remove Selected
                </button>
            </div>

            {/* Cart Items (Scrollable Area) */}
            <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <ShoppingCartIcon size={48} className="mx-auto mb-4 opacity-50"/>
                        <p className="text-lg font-medium">Your cart is empty</p>
                        <p className="text-sm">Add some items to get started!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.productId}
                                className={`flex items-center gap-3 p-3 border rounded-lg transition-colors duration-200 ${
                                    selectedItems.has(item.productId) ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
                                }`}
                            >
                                {/* Checkbox */}
                                <input
                                    type="checkbox"
                                    checked={selectedItems.has(item.productId)}
                                    onChange={() => handleItemSelect(item.productId)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />

                                {/* Product Image */}
                                <img
                                    src={`http://localhost:3000/uploads/${item.image}`} // Use the full image URL from the state
                                    alt={item.name}
                                    className="w-16 h-16 rounded object-cover"
                                />

                                {/* Product Details */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-gray-800 truncate">{item.name}</h3>
                                    <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => decreaseQuantity(item.productId)}
                                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                            // disabled={item.quantity <= 1}
                                        >
                                            <Minus size={14}/>
                                        </button>
                                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => increaseQuantity(item.productId)}
                                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                        >
                                            <Plus size={14}/>
                                        </button>
                                    </div>
                                </div>

                                {/* Item Total */}
                                <div className="text-right">
                                    <div className="font-bold text-gray-800">
                                        {item.currency}{(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                    {/* Totals */}
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Total Items:</span>
                            <span>{totalItems}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-800">
                            <span>Total Price:</span>
                            <span>Rs.{totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Continue Shopping */}
                    <button
                        onClick={handleContinueShopping}
                        className="w-full text-blue-600 hover:text-blue-800 font-medium py-2 transition-colors duration-200"
                    >
                        ← Continue Shopping
                    </button>
                </div>
            )}
        </div>
    </div>
);
}
;