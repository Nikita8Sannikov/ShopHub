import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/store";
import { Product } from "../../types/types";
import { Button } from "../ui/button";

interface ProductPageProps {
	product: Product;
	onAdd: (product: Product) => void;
}
const ProductPage: React.FC<ProductPageProps> = ({ product, onAdd }) => {
	const isAuth = useSelector((state: RootState) => state.auth.exists);
	return (
		<div>
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
			<Button 
                disabled={!isAuth} 
                onClick={() => onAdd(product)}>
                    {isAuth ? "Добавить в корзину" : "Войдите, чтобы купить"}
                    </Button>
		</div>
	);
};

export default ProductPage;
