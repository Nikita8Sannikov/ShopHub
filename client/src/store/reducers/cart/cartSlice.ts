import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState, Product } from "@/types/types";
import {SERVER_API_URL} from "../../../utils/utils";

export const fetchCartByUserId = createAsyncThunk<CartItem[], string | undefined>(
    "cart/fetchCartByUserId",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${SERVER_API_URL}/api/cart/cartlist`, {
                credentials: "include"
            })
            const data = await response.json()
            let filteredData;

            if (id) {
                filteredData = data.filter((item: { userId: string; }) => item.userId === id)

            } else {
                const guestResponse = await fetch(`${SERVER_API_URL}/api/cart/get-cookie`, {
                    credentials: "include"
                });
                const guestData = await guestResponse.json();
                const guestId = guestData.guestId;

                if (!guestId) {
                    return [];
                }

                filteredData = data.filter((item: { guestId: string; }) => item.guestId === guestId)
            }

            return filteredData

        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const addToCart = createAsyncThunk<CartItem, { product: Product; userId?: string }>(
    "cart/addToCart",
    async ({ product, userId }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${SERVER_API_URL}/api/cart/add`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    goodsId: product._id
                })
            });

            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data.message || "Something went wrong");
            }

            return data
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const deleteFromCart = createAsyncThunk<string, string>(
    "cart/deleteFromCart",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${SERVER_API_URL}/api/cart/${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data.message || "Something went wrong");
            }
            return id;
        } catch (error) {
            if (error instanceof Error) {
                return Promise.reject(rejectWithValue(error.message));
            }
            return Promise.reject(rejectWithValue("Unknown error"));
        }
    }
)

export const patchAmountCart = createAsyncThunk<CartItem, { id: string; action: "increase" | "decrease" }>(
    "cart/patchAmount",
    async ({ id, action }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${SERVER_API_URL}/api/cart/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ action })
            })

            const data: CartItem = await response.json();
            if (!response.ok) {
                return rejectWithValue(data);
            }
            return data
        } catch (error) {
            if (error instanceof Error) {
                return Promise.reject(rejectWithValue(error.message)); // Исключаем `undefined`
            }
            return Promise.reject(rejectWithValue("Unknown error"));
        }
    }
)

const initialState: CartState = {
    items: [] as CartItem[],
    status: "idle",
    error: null,
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.items = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartByUserId.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchCartByUserId.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
                state.items = action.payload
                state.status = "succeeded"
            })
            .addCase(fetchCartByUserId.rejected, (state) => {
                state.status = "failed"
            })
            .addCase(addToCart.pending, (state) => {
                state.status = "loading"
            })
            .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
                state.items = [...state.items, { ...action.payload, amount: 1 }];
                state.status = "succeeded";
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || "Error"
            })
            .addCase(deleteFromCart.pending, (state) => {
                state.status = "loading"
            })
            .addCase(deleteFromCart.fulfilled, (state, action: PayloadAction<string>) => {
                if (action.payload) {
                    state.items = state.items.filter(item => item.goodsId !== action.payload)
                }
            })
            .addCase(deleteFromCart.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || "Error"
            })
            .addCase(patchAmountCart.pending, (state) => {
                state.status = "loading"
            })
            .addCase(patchAmountCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
                const updatedItem = action.payload;
                const index = state.items.findIndex(item => item.goodsId === updatedItem.goodsId);
                if (index !== -1) {
                    state.items[index].amount = updatedItem.amount;
                }
                state.status = "succeeded";
            })
            .addCase(patchAmountCart.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || "Error"
            })

    },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
