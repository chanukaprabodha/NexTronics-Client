import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {ProductData} from "../modal/ProductData.ts";
import Swal from "sweetalert2";
import {backendApi} from "../api.ts";

interface ProductState {
    list: ProductData[],
    error: string | null | undefined,
    product: ProductData | null
}

const initialState: ProductState = {
    product: null,
    list: [],
    error: null
}

export const getAllProducts = createAsyncThunk(
    'product/getAllProducts',
    async () => {
        const response = await backendApi.get("/products/all");
        return await response.data;
    }
);

export const getProductById = createAsyncThunk(
    'product/getProductById',
    async (id: string) => {
        const response = await backendApi.get(`/products/${id}`);
        return await response.data;
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, () => {
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

        }).addCase(getProductById.pending, () => {
        }).addCase(getProductById.fulfilled, (state: ProductState, action) => {
            state.product = action.payload;
        }).addCase(getProductById.rejected, (state: ProductState, action) => {
            state.error = (action.payload as Error)?.message || 'Failed to fetch product';
            Swal.fire({
                title: 'Error',
                text: state.error,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        });
    }
});

export default productSlice.reducer;