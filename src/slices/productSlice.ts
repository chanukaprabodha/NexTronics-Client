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
        try {
            const response = await backendApi.get("/products/all");
            return await response.data;
        } catch (e) {
            console.error("Error fetching all products:", e);
            throw new Error(e.response?.data || "Failed to fetch products");
        }
    }
);

export const getProductById = createAsyncThunk(
    'product/getProductById',
    async (id: string) => {
        try {
            const response = await backendApi.get(`/products/${id}`);
            return await response.data;
        } catch (e) {
            console.error("Error fetching product by ID:", e);
            throw new Error(e.response?.data || "Failed to fetch product by ID");
        }
    }
);

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async(product: FormData | Record<string, any>, { rejectWithValue }) => {
        try {
            const response = await backendApi.post("/products/save", product);
            return response.data;
        } catch (error: any) {
            console.error("Backend error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({ id, updatedData }: { id: number; updatedData: FormData | Record<string, any> }) => {
        try {
            const response = await backendApi.put(`/products/update/${id}`, updatedData);
            return response.data;
        } catch (e) {
            console.error("Error updating product:", e);
            throw new Error(e.response?.data || "Failed to update product");
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id: number) => {
        try {
            await backendApi.delete(`/products/delete/${id}`);
            return id;
        } catch (e) {
            console.error("Error deleting product:", e);
            throw new Error(e.response?.data || "Failed to delete product");
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //  getAllProducts
            .addCase(getAllProducts.pending, () => {
            })
            .addCase(getAllProducts.fulfilled, (state: ProductState, action) => {
                state.list = action.payload;
            })
            .addCase(getAllProducts.rejected, (state: ProductState, action) => {
                state.error = (action.payload as Error)?.message || 'Failed to fetch products';
                Swal.fire({
                    title: 'Error',
                    text: state.error,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            })
            // getProductById
            .addCase(getProductById.pending, () => {
            })
            .addCase(getProductById.fulfilled, (state: ProductState, action) => {
                state.product = action.payload;
            })
            .addCase(getProductById.rejected, (state: ProductState, action) => {
                state.error = (action.payload as Error)?.message || 'Failed to fetch product';
                Swal.fire({
                    title: 'Error',
                    text: state.error,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            })
            // Add Product
            .addCase(addProduct.pending, () => {
            })
            .addCase(addProduct.fulfilled, (state: ProductState, action) => {
                state.list.push(action.payload);
                Swal.fire({
                    title: 'Success',
                    text: 'Product added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            })
            .addCase(addProduct.rejected, (state: ProductState, action) => {
                state.error = (action.payload as Error)?.message || "Failed to add product";
                Swal.fire({
                    title: "Error",
                    text: state.error,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            })

            // Update Product
            .addCase(updateProduct.pending, () => {
            })
            .addCase(updateProduct.fulfilled, (state: ProductState, action) => {
                const index = state.list.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
                Swal.fire({
                    title: 'Success',
                    text: 'Product updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            })
            .addCase(updateProduct.rejected, (state: ProductState, action) => {
                state.error = (action.payload as Error)?.message || 'Failed to update product';
                Swal.fire({
                    title: 'Error',
                    text: state.error,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            })

            // Delete Product
            .addCase(deleteProduct.pending, () => {
            })
            .addCase(deleteProduct.fulfilled, (state: ProductState, action) => {
                state.list = state.list.filter((product) => product.id !== action.payload);
                Swal.fire({
                    title: 'Success',
                    text: 'Product deleted successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            })
            .addCase(deleteProduct.rejected, (state: ProductState, action) => {
                state.error = (action.payload as Error)?.message || 'Failed to delete product';
                Swal.fire({
                    title: 'Error',
                    text: state.error,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }
});

export default productSlice.reducer;