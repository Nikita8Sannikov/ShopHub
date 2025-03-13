import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, Product } from "../../../types/types";

export const fetchCart = createAsyncThunk<CartItem[], void>(
    "cart/fetchCart",
    async () => {
        const response = await fetch("/api/cart/cartlist")
        const data = await response.json()
        return data
    }
)

export const addToCart = createAsyncThunk<CartItem, { product: Product; userId?: string }>(
    "cart/addToCart",
    async ({ product, userId }, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    guestId: document.cookie.split('; ').find(row => row.startsWith('guestId='))?.split('=')[1], 
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
            const response = await fetch(`/api/cart/${id}`, {
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

export const patchAmountCart = createAsyncThunk< CartItem, { id: string; action: "increase" | "decrease" }>(
    "cart/patchAmount",
    async ({ id, action }, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/cart/${id}`, {
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
                return Promise.reject(rejectWithValue(error.message)); // ✅ Исключаем `undefined`
            }
            return Promise.reject(rejectWithValue("Unknown error"));
        }
    }
)

// export type CartItem = Product & { amount: number };
export type CartItem = {
    // _id: string;
    goodsId: string;
    amount: number;
    userId?: string;
    guestId?: string;
};


// const initialState: CartState = {
//     products: [],
//     items: [] ,
//     totalPrice: 0,
//     status: "idle",
//     error: null,
//     product: null
// }
const initialState: CartState = {
    items: [] as CartItem[],
    status: "idle",
    error: null,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // addItem: (state, action: PayloadAction<Product>) => {
        //     const item = state.items.find(item => item.id === action.payload.id)
        //     if (item) {
        //         item.amount++
        //     } else {
        //         state.items.push({ ...action.payload, amount: 1 });
        //     }
        //     state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.amount, 0);
        // },
        // removeItem: (state, action: PayloadAction<Product>) => {
        //     const index = state.items.findIndex((item) => {
        //         return item.id === action.payload.id;
        //     });

        //     if (index !== -1) {
        //         if (state.items[index].amount > 1) {
        //             state.items[index].amount -= 1;
        //         } else {
        //             state.items.splice(index, 1);
        //         }
        //     }
        //     state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.amount, 0);
        // },
        // removeItemAll: (state, action: PayloadAction<Product>) => {
        //     const index = state.items.findIndex((item) => {
        //         return item.id === action.payload.id;
        //     });
        //     if (index !== -1) {
        //         state.items.splice(index, 1);
        //     }
        //     state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.amount, 0);
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
                state.items = action.payload
                state.status = "succeeded"
            })
            .addCase(fetchCart.rejected, (state) => {
                state.status = "failed"
            })
            .addCase(addToCart.pending, (state) => {
                state.status = "loading"
            })
            .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
                state.items.push({
                    ...action.payload,
                    amount: 1 
                });
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

// export const {  } = cartSlice.actions;

export default cartSlice.reducer;
