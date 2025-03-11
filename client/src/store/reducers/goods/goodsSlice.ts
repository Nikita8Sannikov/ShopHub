import { GoodsState, Product } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchGoods = createAsyncThunk<Product[], void>(
    "goods/fetchGoods",
    async () => {
        const response = await fetch("/api/goods/productslist")
        const data = await response.json()
        return data
    }
)

export const fetchGoodsById = createAsyncThunk<Product, string>(
    "goods/fetchGoodsById",
    async (id) => {
        const response = await fetch(`/api/goods/${id}`)
        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }
        const data = await response.json()
        return data
    }
)

export const createProduct = createAsyncThunk(
    "goods/createProduct",
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/goods/create", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to create product");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const updateProduct = createAsyncThunk(
    "goods/updateProduct",
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/goods/${formData.get("_id")}`, {
                method: "PATCH",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to update product");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const deleteProduct = createAsyncThunk(
    "goods/deleteProduct",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/goods/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete product");
            }

            return id;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
        }
    }
);


const initialStateGoods: GoodsState = {
    data: [],
    status: "idle",
    error: null,
    product: null
}

const goodsSlice = createSlice({
    name: "goods",
    initialState: initialStateGoods,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoods.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchGoods.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.data = action.payload
                state.status = "fulfilled"
            })
            .addCase(fetchGoods.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || "Error"
            })
            .addCase(fetchGoodsById.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchGoodsById.fulfilled, (state, action: PayloadAction<Product>) => {
                state.status = "fulfilled"
                state.product = action.payload
            })
            .addCase(fetchGoodsById.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || "Error"
            })
            .addCase(deleteProduct.pending, (state) => {
                state.status = "loading"
            })
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string | undefined>) => {
                state.status = "fulfilled"
                if (action.payload) {
                    state.data = state.data.filter(product => product._id !== action.payload)
                }
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || "Error"
            })
            .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.status = "fulfilled"
                state.data.push(action.payload)
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || "Error"
            })
            .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.status = "fulfilled"
                state.data = state.data.map(product => product._id === action.payload._id ? action.payload : product)
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || "Error"
            })
    }
})

export default goodsSlice.reducer