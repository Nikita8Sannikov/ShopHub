import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, Product } from "../../../types/types";
import products from "../../../products.json";

export const fetchProducts = createAsyncThunk<Product[], void>(
    "cart/fetchProducts",
    async () => {
        // const response = await fetch("https://fakestoreapi.com/products");
        // const data = await response.json();
        // return data;
        return products
    }
);

export const fetchProductsById = createAsyncThunk<Product, number>(
    "cart/fetchProductsById",
    async (id) => {
        // const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        // const data = await response.json()
        // return data
        const product = products.find((item) => item.id === id);
        if (!product) throw new Error("Product not found");
        return product;
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
            const item = state.items.find(item => item.id === action.payload.id)
           if(item) {
            item.amount++
           }else {
            state.items.push({ ...action.payload, amount: 1 });
        }
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.amount, 0);
        },
        removeItem: (state, action: PayloadAction<Product>) => {
            const index = state.items.findIndex((item) => {
                return item.id === action.payload.id;
            });

            if (index !== -1) {
                if (state.items[index].amount > 1) {
                    state.items[index].amount -= 1;
                } else {
                    state.items.splice(index, 1);
                }
            }
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.amount, 0);
        },
        removeItemAll: (state, action: PayloadAction<Product>) => {
            const index = state.items.findIndex((item) => {
                return item.id === action.payload.id;
            });
            if (index !== -1) {
                state.items.splice(index, 1);
            }
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.amount, 0);
        }
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

export const { addItem, removeItem, removeItemAll } = cartSlice.actions;

export default cartSlice.reducer;
