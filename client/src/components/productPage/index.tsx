import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/store";
import { Product } from "../../types/types";
import { Button } from "../ui/button";

interface ProductPageProps {
	product: Product;
	onAdd: (product: Product) => void;
	onEdit: () => void;
	onRemove: (product: Product) => void;
}
const ProductPage: React.FC<ProductPageProps> = ({ product, onAdd, onEdit, onRemove }) => {
	const user = useSelector((state: RootState) => state.auth.user);
	const items = useSelector((state: RootState) => state.cart.items);
    const isInCart = items.some((item) => item.id === product.id);
    const item = items.find((item) => item.id === product.id);

	const callbacks = {
        onAdd: onAdd,
        onRemove: onRemove,
		onEdit: onEdit,
    };
	return (
		<div className="mt-[150px]">
			<h4>id {product.id}</h4>

			<h4>{product.title}</h4>
			<h4>{product.category}</h4>
			{product.image && (
				<img
					style={{ width: "100px" }}
					src={product.image}
					alt={product.title}
				/>
			)}
			<h4>{product.description}</h4>
			<h4>Цена: {product.price}</h4>

			{isInCart ? (
				<>
					<Button onClick={() => callbacks.onRemove(product)}>-</Button>
					<span>{item?.amount}</span>
					<Button onClick={() => callbacks.onAdd(product)}>+</Button>
				</>
			) : (
				<Button
					onClick={() => callbacks.onAdd(product)}>
					Добавить в корзину
				</Button>
			)}
			{user?.isAdmin &&
				<Button onClick={callbacks.onEdit}>Редактировать</Button>
			}
		</div>
	);
};

export default ProductPage;
