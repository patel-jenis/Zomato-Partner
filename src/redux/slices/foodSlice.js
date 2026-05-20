import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/utils";

export const getFoods = createAsyncThunk(
    "food/getFoods",
    async (_, { rejectWithValue }) => {

        try {

            const res = await api.get("/foods");

            return res.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch foods"
            );
        }
    }
);

export const addFood = createAsyncThunk(
    "food/addFood",
    async (formData, { rejectWithValue }) => {

        try {

            const res = await api.post(
                "/foods",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return res.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message || "Failed to add food"
            );
        }
    }
);

export const deleteFood = createAsyncThunk(
    "food/deleteFood",
    async (foodId, { rejectWithValue }) => {

        try {

            await api.delete(`/foods/${foodId}`);

            return foodId;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message || "Failed to delete food"
            );
        }
    }
);

export const updateFood = createAsyncThunk(
    "food/updateFood",
    async ({ foodId, formData }, { rejectWithValue }) => {

        try {

            const res = await api.put(
                `/foods/${foodId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return res.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message || "Failed to update food"
            );
        }
    }
);

const initialState = {
    items: [],
    total: 0,
    loading: false,
    error: null,
};

const foodSlice = createSlice({
    name: "food",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFoods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFoods.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data || [];
                state.total = action.payload.data?.length || 0;
            })
            .addCase(getFoods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addFood.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFood.fulfilled, (state, action) => {
                state.loading = false;
                state.items.unshift(action.payload.data);
                state.total = state.items.length;
            })
            .addCase(addFood.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteFood.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteFood.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(
                    (item) => item._id !== action.payload
                );
                state.total = state.items.length;
            })
            .addCase(deleteFood.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateFood.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateFood.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.map((item) =>
                    item._id === action.payload.data._id
                        ? action.payload.data
                        : item
                );
            })
            .addCase(updateFood.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default foodSlice.reducer;