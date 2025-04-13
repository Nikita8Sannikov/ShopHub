import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, CategoryState } from "@/types/types";
import { SERVER_API_URL } from "../../../utils/utils";


export const fetchCategories = createAsyncThunk<Category[]>(
    "categories/fetchCategories",
    async () => {
        const response = await fetch(`${SERVER_API_URL}/api/categories/categorieslist`);
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        const data = await response.json()
        return data
    }
);

export const createCategory = createAsyncThunk(
    "categories/createCategory",
    async (name: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`${SERVER_API_URL}/api/categories/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                throw new Error("Failed to create category");
            }

            const data = await response.json();
            console.log(data);
            
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`${SERVER_API_URL}/api/categories/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete category");
            }

            return id;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
        }
    }
);


const initialStateCategories: CategoryState = {
    categories: [],
    status: "idle",
    error: null,
};


const categoriesSlice = createSlice({
    name: "category",
    initialState: initialStateCategories,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.status = "fulfilled";
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Error";
            })
            .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                state.status = "fulfilled";
                state.categories.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Error";
            })
            .addCase(deleteCategory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string | undefined>) => {
                state.status = "fulfilled";
                if (action.payload) {
                    state.categories = state.categories.filter(category => category._id !== action.payload);
                }
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Error";
            })
    },
});

export default categoriesSlice.reducer;