export type UserId = string;

export interface User {
    _id: UserId,
    email: string,
    name: string,
    // password?: string,
    isAdmin?: boolean
}

export interface LoginState {
    user: User | null,
    error: string | null,
    exists: boolean,
    status: "idle" | "loading" | "succeeded" | "failed"
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
    image: string
}

export type CartItem = {
    _id: string;
    goodsId: string;
    amount: number;
    userId?: string;
    guestId?: string;
};

export interface CartState {
    items: CartItem[]
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | null
    totalPrice: number,
}

export interface Category {
    _id: string;
    name: string;
};

export interface CategoryState {
    categories: Category[];
    status: "idle" | "loading" | "fulfilled" | "failed";
    error: string | null;
};

export type AuthFormValues = {
    name?: string;
    email: string;
    password: string;
};
