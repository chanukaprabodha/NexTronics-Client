import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendApi } from "../api.ts";

interface OrderState {
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: OrderState = {
    loading: false,
    error: null,
    success: false,
};

export const initiatePayment = createAsyncThunk(
    "order/initiatePayment",
    async ({ orderDetails, user }: { orderDetails: any; user: { id: string } },
           { rejectWithValue }) => {
        try {
            const response = await backendApi.post(`/order/pay/${user.id}`, orderDetails);
            return response.data;
        } catch (error: any) {
            console.error("Error initiating payment:", error);
            return rejectWithValue(error.response?.data || "Payment initiation failed");
        }
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        resetOrderState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initiatePayment.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(initiatePayment.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(initiatePayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;