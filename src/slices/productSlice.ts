import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {ProductData} from "../modal/ProductData.ts";
import Swal from "sweetalert2";
import {backendApi} from "../api.ts";

interface ProductState {
    list: ProductData[],
    error: string | null | undefined
}

const initialState: ProductState = {
    list: [],
    error: null
}

export const getAllProducts = createAsyncThunk(
    'product/getAllProducts',
    async () => {
        /*const responsePromise = await fetch('./product-data.json');
        return await responsePromise.json();*/
        const response = await backendApi.get("/products/all");
        return await response.data;
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, () => {
            Swal.fire({
                title: 'Loading',
                text: 'Please wait while products are being loaded',
                icon: 'info',
                showConfirmButton: false,
                timer: 2000
            })
        }).addCase(getAllProducts.fulfilled, (state: ProductState, action) => {
            state.list = action.payload;
        }).addCase(getAllProducts.rejected, (state: ProductState, action) => {
            state.error = (action.payload as Error)?.message || 'Failed to fetch products';
            Swal.fire({
                title: 'Error',
                text: state.error,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        })
    }
});

export default productSlice.reducer;