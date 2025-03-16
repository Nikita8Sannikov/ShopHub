import { CartItem } from "@/store/reducers/cart/cartSlice";

export type UserId = string;
export interface User {
    _id: UserId
    email: string
    name: string
    first_name: string
    last_name: string
    avatar: string
    isAdmin: boolean
    description: string
    role: string
}

export type UserState = {
    data: User[]
    status: "idle" | "loading" | "fulfilled" | "failed"
    error: string | null
    page: number
    total_pages: number
    user: User | null
}
export type GoodsState = {
    data: Product[]
    status: "idle" | "loading" | "fulfilled" | "failed"
    error: string | null
    product: Product | null
}

export interface Product {
    _id: string;
    title: string
    category: string
    description: string
    price: number
    rating: number
    // amount: number
    // image: string
    image: File
}

// export interface CartState {
//     items: Product[]
//     products: Product[]
//     totalPrice: number
//     status: "idle" | "loading" | "succeeded" | "failed"
//     error: string | null
//     product: Product | null
// }
export interface CartState {
    items: CartItem[]
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | null
    totalPrice: number,
}
