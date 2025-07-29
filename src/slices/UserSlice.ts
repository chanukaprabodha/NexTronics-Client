import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userModel from "../modal/User.ts";
import {backendApi} from "../api.ts";

interface UserState {
    user: userModel | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const registerUser = createAsyncThunk(
    'user/register',
    async (userData: Omit<User, 'id' | 'active'>, { rejectWithValue }) => {
        try {
            const response = await backendApi.post<User>('/users/register', userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state: UserState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state: UserState, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state: UserState, action) => {
                state.loading = false; // Ensure loading is reset
                state.error = action.payload as string;
            });
    }
});

export default userSlice.reducer;