import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/utils";

export const registerRestaurants = createAsyncThunk(
    "auth/registerRestaurants",

    async (restaurantData, { rejectWithValue }) => {
        try {
            const res = await api.post(
                "/auth/register",
                restaurantData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Registration failed"
            );
        }
    }
);

export const loginRestaurant = createAsyncThunk(
    "auth/loginRestaurant",

    async (loginData, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/login", loginData);
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Login failed"
            );
        }
    }
);

export const fetchRestaurantProfile = createAsyncThunk(
    "auth/fetchRestaurantProfile",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/auth/me");

            return res.data.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch profile"
            );
        }
    }
);

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(registerRestaurants.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerRestaurants.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
            })
            .addCase(registerRestaurants.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginRestaurant.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginRestaurant.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
            })
            .addCase(loginRestaurant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchRestaurantProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRestaurantProfile.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload);
                state.user = action.payload;
            })
            .addCase(fetchRestaurantProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;