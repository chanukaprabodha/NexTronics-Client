import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
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
    async (userData: Omit<User, 'id' | 'active'>, {rejectWithValue}) => {
        try {
            const response = await backendApi.post<User>('/users/register', userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

export const fetchUserFormId = createAsyncThunk(
    "user/getUserById",
    async (id: string) => {
        try {
            const response = await backendApi.get(`/users/${id}`);
            return await response.data;
        } catch (error) {
            console.error("Error fetching user data:", error);
            throw new Error(error.response?.data || "Failed to fetch user data");
        }
    });

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
            })
            .addCase(fetchUserFormId.pending, (state: UserState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserFormId.fulfilled, (state: UserState, action) => {
                state.loading = false;
                state.user = action.payload;
            });
    }
});

export default userSlice.reducer;