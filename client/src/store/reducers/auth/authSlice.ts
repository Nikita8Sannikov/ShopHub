import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginState, User } from "@/types/types";
import {SERVER_API_URL} from "../../../utils/utils";

export const signIn = createAsyncThunk<User, { email: string; password: string}>(
    "auth/signIn",
    async (data: {
        email: string; password: string,
    }) => {
        const response = await fetch(`${SERVER_API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
             credentials: "include"
        })
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const json = await response.json()
        return json
    }
)

export const signOut = createAsyncThunk<User, void>(
    "auth/signOut",
    async () => {
        const response = await fetch(`${SERVER_API_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include"
        })
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const json = await response.json()
        console.log(json);
        return json
    }
)

export const register = createAsyncThunk<User, { email: string; password: string, name: string }>(
    "auth/register",
    async (data: { email: string; password: string, name: string }) => {
        const response = await fetch(`${SERVER_API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)

        })
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const json = await response.json()
        console.log(json);
        return json
    }
)

export const remind = createAsyncThunk<User, void>(
    "auth/remind",
    async () => {
        const response = await fetch(`${SERVER_API_URL}/api/auth/me`, {
            method: "GET",
            credentials: "include"
        })
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const json = await response.json()
        return json
    }
)

const initialState: LoginState = {
    user: null,
    error: null,
    exists: false,
    status: "idle",
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload
                state.status = "succeeded"
                state.exists = true
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || "failed"
            })
            .addCase(signOut.fulfilled, (state) => {
                state.user = null
                state.exists = false
                state.error = null
            })
            .addCase(signOut.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || "failed"
            })
            .addCase(register.fulfilled, (state) => {
                state.status = "succeeded"
                state.exists = false

            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || "failed"
            })
            .addCase(remind.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(remind.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload
                state.status = "succeeded"
                state.exists = true
            })
            .addCase(remind.rejected, (state, action) => {
                state.status = 'failed'
                state.exists = false
                state.user = null;
                state.error = action.error.message || "failed"
            })
    }
})

// export const {  } = authSlice.actions
export default authSlice.reducer