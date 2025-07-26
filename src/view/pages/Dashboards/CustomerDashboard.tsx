import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {getAllProducts} from "../../../slices/productSlice.ts";
import {ProductCard} from "../../component/ProductCard.tsx";


export function CustomerDashboard() {

    const dispatch = useDispatch<AppDispatch>();
    const [userName, setUsername] = useState<string | null>(null);

    useEffect(() => {

        const userName = localStorage.getItem('username');

        setUsername(userName);
    }, []);

    const {list} = useSelector(
        (state: RootState) => state.product);

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    if (!list || list.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No products available at the moment.</p>
            </div>
        );
    }

    console.log(list);

    return (
        <>
            <div className="flex-1 p-6 lg:p-8 pb-20 lg:pb-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, {userName}! 👋
                    </h1>
                    <p className="text-gray-600">Here's what's happening with your orders and account.</p>
                </div>

                {/*Products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {list.map((product) => (
                        <ProductCard key={product.id} data={product}/>
                    ))}
                </div>
            </div>
        </>
    );
}
