import Swal from "sweetalert2";
import {backendApi} from "../api.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {ContactData} from "../modal/ContactData.ts";

interface ContactState {
    list: ContactData[],
    error: string | null | undefined
}

const initialState: ContactState = {
    list: [],
    error: null
}

export const sendMessage = createAsyncThunk(
    'contact/sendMessage',
    async (contactData: ContactData) => {
        try {
            const response = await backendApi.post("/contact/save", contactData);
            return response.data;
        } catch (error) {
            throw new Error((error as Error).message || 'Failed to send message');
        }
    }
);

const contactSlice = createSlice({
    name: 'contact',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendMessage.pending, () => {
            Swal.fire({
                title: 'Sending',
                text: 'Please wait while your message is being sent',
                icon: 'info',
                showConfirmButton: false,
                timer: 2000
            })
        }).addCase(sendMessage.fulfilled, (state: ContactState, action) => {
            state.list.push(action.payload);
            Swal.fire({
                title: 'Success',
                text: 'Your message has been sent successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }).addCase(sendMessage.rejected, (state: ContactState, action) => {
            state.error = (action.payload as Error)?.message || 'Failed to send message';
            Swal.fire({
                title: 'Error',
                text: state.error,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        })
    }
});

export default contactSlice.reducer;