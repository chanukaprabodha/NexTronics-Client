import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { initiatePayment } from "../../../slices/orderSlice.ts";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {fetchUserFormId} from "../../../slices/userSlice.ts";
import {useLocation, useNavigate} from "react-router-dom";
import swal from "sweetalert2";
import {IdGenerator} from "../../../utils/IdGenerator.ts";

declare global {
    interface Window {
        payhere: any;
    }
}
const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) => state.user.user);

    const { loading, error, success } = useSelector((state: RootState) => state.order);

    const selectedItems = location.state?.selectedItems || [];

    const userId = location.state?.userId || user?.id;

    const [orderDetails, setOrderDetails] = useState({
        name: "",
        email: "",
        phone: "",
        amount: 0,
        address: "",
    });

    useEffect( () => {
        const fetchUser = async () => {
            if (userId) {
                await dispatch(fetchUserFormId(userId));
            }
        };
        fetchUser();
    }, [userId, dispatch]);

    useEffect(() => {
        if (user) {
            const orderId = IdGenerator.generateId("ORD");
            setOrderDetails((prevDetails) => ({
                ...prevDetails,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                amount: selectedItems.reduce((total, item) => total + item.price * item.quantity, 0),
            }));
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
    };

    const handlePayment = async () => {
        if (selectedItems.length === 0) {
            alert("No items selected for checkout!");
            return;
        }

        const response = await dispatch(initiatePayment({ user, orderDetails: { ...orderDetails, items: selectedItems } })).unwrap();
        console.log("Payment Response: ", response);

        const loadPayHereScript = () => {
            return new Promise<void>((resolve, reject) => {
                if (window.payhere) {
                    resolve();
                    return;
                }
                const script = document.createElement("script");
                script.src = "https://www.payhere.lk/lib/payhere.js";
                script.async = true;
                script.onload = () => resolve();
                script.onerror = () => reject("Failed to load PayHere SDK");
                document.body.appendChild(script);
            });
        };


        try {
            await loadPayHereScript();

            window.payhere.startPayment(response.paymentRequest);

            window.payhere.onCompleted = function onCompleted(orderId) {
                alert("Payment completed. Order ID:" + orderId);
                navigate("/customer-dashboard");
            };

            window.payhere.onDismissed = function onDismissed() {
                alert("Payment dismissed");
            };

            window.payhere.onError = function onError(error) {
                alert("Payment error: " + error);
            };
        }catch (err) {
            alert("Payment failed: " + (typeof err === "string" ? err : "Unknown error"));
        }
    };

    useEffect(() => {
        if (success) {
            swal.fire({
                icon: "success",
                title: "Payment Successful",
                text: "Your order has been placed successfully!",
                confirmButtonText: "OK",
                timer: 1500,
            });
            navigate("/customer-dashboard");
        }
    }, [success, dispatch, navigate]);

    return (
        <div className=" bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
                        <h1 className="text-3xl font-bold text-white">Checkout</h1>
                        <p className="text-green-100 mt-2">Complete your order details</p>
                    </div>

                    <div className="p-8">
                        {/* Order Summary */}
                        {selectedItems.length > 0 && (
                            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                                <div className="space-y-2">
                                    {selectedItems.map((item, index) => (
                                        <div key={index}
                                             className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                                            <span className="text-gray-700">{item.name} x {item.quantity}</span>
                                            <span
                                                className="font-medium text-gray-900">Rs.{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-300">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-gray-900">Total:</span>
                                        <span
                                            className="text-2xl font-bold text-green-600">Rs.{orderDetails.amount.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Checkout Form */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing Information</h2>

                            {/* Name Field */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={orderDetails.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={orderDetails.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                />
                            </div>

                            {/* Phone Field */}
                            <div className="space-y-2">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    value={orderDetails.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                />
                            </div>

                            {/* Amount Field */}
                            <div className="space-y-2">
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                    Amount
                                </label>
                                <input
                                    id="amount"
                                    type="number"
                                    name="amount"
                                    placeholder="Amount"
                                    value={orderDetails.amount}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 bg-gray-50"
                                    readOnly
                                />
                            </div>

                            {/* Address Field */}
                            <div className="space-y-2">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    Delivery Address
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    placeholder="Enter your complete address"
                                    value={orderDetails.address}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-red-400" fill="currentColor"
                                                 viewBox="0 0 20 20">
                                                <path fillRule="evenodd"
                                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-red-800">{error}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Success Message */}
                            {success && (
                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-green-400" fill="currentColor"
                                                 viewBox="0 0 20 20">
                                                <path fillRule="evenodd"
                                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-green-800">Payment Successful!</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Payment Button */}
                            <div className="pt-6">
                                <button
                                    onClick={() =>
                                swal.fire({
                                    icon: 'info',
                                    title: 'Coming Soon',
                                    text: 'This feature will be enabled soon. Stay tuned!',
                                    confirmButtonText: 'OK',
                                })}
                                    disabled={loading}
                                    className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 transform ${
                                        loading
                                            ? 'bg-gray-400 cursor-not-allowed text-white'
                                            : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:scale-[1.02] focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                                    }`}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none"
                                                 viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10"
                                                        stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor"
                                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                            </svg>
                                            Pay Now
                                        </div>
                                    )}
                                </button>
                            </div>

                            {/* Security Notice */}
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center">
                                    <svg className="h-5 w-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <p className="text-sm text-blue-800">Your payment information is secure and
                                        encrypted.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;