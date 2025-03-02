import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, Product } from "../../../types/types";

export const fetchProducts = createAsyncThunk<Product[], void>(
    "cart/fetchProducts",
    async () => {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        return data;
    }
);

export const fetchProductsById = createAsyncThunk<Product, number>(
    "cart/fetchProductsById",
    async (id) => {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await response.json()
        return data
    }
)


const initialState: CartState = {
    products: [],
    items: [],
    totalPrice: 0,
    status: "idle",
    error: null,
    product: null
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Product>) => {
            state.items.push(action.payload);
            state.totalPrice += action.payload.price;
        },
        removeItem: (state, action: PayloadAction<Product>) => {
            const index = state.items.findIndex((item) => {
                // console.log(action.payload);

                return item.id === action.payload.id;
            });

            if (index !== -1) {
                state.items.splice(index, 1);

                state.totalPrice -= action.payload.price;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.products = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "failed";
            })
            .addCase(fetchProductsById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProductsById.fulfilled, (state, action: PayloadAction<Product>) => {
                state.product = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchProductsById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "failed";
            })
    },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
