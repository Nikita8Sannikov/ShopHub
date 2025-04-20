import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/store";
import { SERVER_API_URL } from "@/utils/utils";
import { CartItem, Product } from "../../types/types";
import { Button } from "../ui/button";

interface ProductPageProps {
    product: Product;
    onAdd: (product: Product) => void;
    onEdit: () => void;
    onPlus: (product: CartItem) => void;
    onMinus: (product: CartItem) => void;
}
const ProductPage: React.FC<ProductPageProps> = ({ product, onAdd, onEdit, onPlus, onMinus }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const items = useSelector((state: RootState) => state.cart.items);
    const isInCart = items.some((item) => item.goodsId === product._id);
    const item = items.find((item) => item.goodsId === product._id);

    const categories = useSelector((state: RootState) => state.categories.categories);
    const categoryObj = categories.find(c => c._id === product.category || c.name.toLowerCase() === product.category.toLowerCase());


    const callbacks = {
        onAdd: onAdd,
        onEdit: onEdit,
        onPlus: onPlus,
        onMinus: onMinus
    };
    return (
        <div className="mt-[150px] max-w-3xl mx-auto p-6 rounded-2xl shadow-lg border bg-white space-y-6">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p className="text-muted-foreground text-sm capitalize">{categoryObj?.name || product.category}</p>
            {product.image && (
                <div className="w-full flex justify-center">
                    <img
                        className="h-[300px] object-contain rounded-xl"
                        src={`${SERVER_API_URL}${product.image}`}
                        alt={product.title}
                    />
                </div>
            )}
            <p className="text-base text-gray-700">{product.description}</p>
            <div className="text-xl font-semibold">Цена: ${product.price}</div>

            <div className="flex items-center gap-4">
                {isInCart && item ? (
                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => callbacks.onMinus(item)}>-</Button>
                        <span>{item?.amount}</span>
                        <Button size="sm" variant="outline" onClick={() => callbacks.onPlus(item)}>+</Button>
                    </div>
                ) : (
                    <Button
                        onClick={() => callbacks.onAdd(product)}>
                        Добавить в корзину
                    </Button>
                )}
                {user?.isAdmin &&
                    <Button variant="secondary" onClick={callbacks.onEdit}>Редактировать</Button>
                }
            </div>
        </div>
    );
};

export default ProductPage;
