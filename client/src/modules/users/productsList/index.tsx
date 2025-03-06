import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../store";
import { addItem, fetchProducts } from "@/store/reducers/cart/cartSlice";
import { openModal } from "@/store/reducers/modal/modalSlice";
import { Product } from "@/types/types";

import Header from "@/components/header";
import ProductCard from "@/components/productCard";
import PageLayout from "@/components/page-layout";
import CardGrid from "@/components/CardGrid";
import BasketTool from "@/components/basketTool";
import { TabsCategory } from "@/components/tabsCategory";
import { DialogDemo } from "@/components/dialog";


import "./productsList.css";

export type Category = "all" | "men" | "women" | "jewelry" | "electronics";

const ProductsList: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const products = useSelector((state: RootState) => state.cart.products);
	const status = useSelector((state: RootState) => state.cart.status);
	const [activeCategory, setActiveCategory] = useState<Category>("all");
	const [search, setSearch] = useState("");

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	const filteredProducts = useMemo(() => {
		return products.filter(product => {
			const matchCategory = activeCategory === "all" || product.category === activeCategory
			const matchSearch = product.title.toLowerCase().includes(search.trim().toLowerCase())
			return matchCategory && matchSearch
		})
	}, [activeCategory, search])

	const callbacks = {
		onOpen: () => {
			dispatch(openModal("basket"));
		},
		onAdd:
			(item: Product) => {
				dispatch(addItem(item));
			},
	};

	const renders = {
		item:
			(item: Product) => {
				return (
					<ProductCard
						product={item}
						callback={callbacks.onAdd}
						link={`/products/${item.id}`}
					/>
				);
			},


	};

	return (
		<PageLayout>
			<Header
				search={search}
				setSearch={setSearch}
			>
				<BasketTool callback={callbacks.onOpen} />
				{/* <DialogDemo /> */}
			</Header>
			<TabsCategory setActiveCategory={setActiveCategory} />
			{status === "succeeded" && (
				filteredProducts.length > 0
					?
					<CardGrid items={filteredProducts} renderItem={renders.item} />
					:
					<p className="col-span-3 text-center text-gray-500">Товар не найден</p>
			)}
		</PageLayout>
	);
};

export default React.memo(ProductsList);
