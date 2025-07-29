/*
import type {CartItem} from "../modal/CartItem.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import 'sweetalert2/dist/sweetalert2.min.css';
import {backendApi} from "../api.ts";

interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalPrice: 0
};

export const fetchCartData = createAsyncThunk<CartItem[]>("cart/fetchCartData", async () => {
    const response = await backendApi.get("/cart/get"); // Replace with your API endpoint
    return response.data.items;
});


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.productId === action.payload.productId);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push({
                    ...action.payload,
                    image: action.payload.image.startsWith('http')
                        ? action.payload.image
                        : `http://localhost:3000/uploads/${action.payload.image.replace('/uploads/', '')}` // Avoid duplicate /uploads/
                });
            }
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
            const item = state.items.find(item => item.productId === action.payload.productId);
            if (item) {
                item.quantity += action.payload.quantity;
            }
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.productId !== action.payload);
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        removeSelected: (state, action: PayloadAction<string[]>) => {
            state.items = state.items.filter(item => !action.payload.includes(item.productId));
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartData.fulfilled, (state: CartState, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        });
    }
});

export const {
    addToCart,
    updateQuantity,
    removeFromCart,
    removeSelected,
} = cartSlice.actions;

export default cartSlice.reducer;

*/

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from "@reduxjs/toolkit";
import { backendApi } from '../api';
import type { CartItem } from '../modal/CartItem.ts';

interface CartState {
    items: CartItem[];
    totalPrice: number;
    userId: string | null;
}

const initialState: CartState = {
    items: [],
    totalPrice: 0,
    userId: null,
};

// Fetch cart data for a specific user
export const fetchCartData = createAsyncThunk<CartItem[], string>(
    'cart/fetchCartData',
    async (userId) => {
        console.log(userId);
        const response = await backendApi.get(`/cart/get/${userId}`);
        return response.data.items;
    }
);

// Save cart data to the backend
export const saveCartData = createAsyncThunk<void, void>(
    'cart/saveCartData',
    async (_, { getState }) => {
        const state = getState() as { cart: CartState };
        const { userId, items } = state.cart;
        if (userId) {
            await backendApi.post('/cart/add', { userId, items });
        }
    }
);

// Clear cart data for a specific user
export const clearCartData = createAsyncThunk<void, string>(
    'cart/clearCartData',
    async (userId) => {
        await backendApi.delete(`/cart/${userId}`);
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const existingItem = state.items.find((item) => item.productId === action.payload.productId);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
            const item = state.items.find((item) => item.productId === action.payload.productId);
            if (item) {
                item.quantity += action.payload.quantity;
                if (item.quantity <= 0) {
                    state.items = state.items.filter((item) => item.productId !== action.payload.productId);
                }
            }
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item) => item.productId !== action.payload);
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        removeSelected: (state, action: PayloadAction<string[]>) => {
            state.items = state.items.filter(item => !action.payload.includes(item.productId));
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        clearCart(state) {
            state.items = [];
            state.totalPrice = 0;
        },
        setUserId(state, action: PayloadAction<string | null>) {
            state.userId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartData.fulfilled, (state: CartState, action) => {
            state.items = action.payload;
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        });
    },
});

export const {
    addToCart,
    updateQuantity,
    removeFromCart,
    removeSelected,
    clearCart,
    setUserId
} = cartSlice.actions;
export default cartSlice.reducer;