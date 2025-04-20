import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../store";
import { deleteProduct, fetchGoods } from "@/store/reducers/goods/goodsSlice";
import { addToCart, fetchCartByUserId, patchAmountCart } from "@/store/reducers/cart/cartSlice";
import { fetchCategories } from "@/store/reducers/categories/categoriesSlice";
import { CartItem, Product } from "@/types/types";

import Header from "@/components/header";
import ProductCard from "@/components/productCard";
import PageLayout from "@/components/pageLayout";
import CardGrid from "@/components/cardGrid";
import { CategoryTabs } from "@/components/categoryTabs";

// export type Category = "all" | "men" | "women" | "jewelry" | "electronics";

const ProductsList: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();

	const products = useSelector((state: RootState) => state.goods.data);
	const status = useSelector((state: RootState) => state.goods.status);
	const user = useSelector((state: RootState) => state.auth.user);
	const categories = useSelector((state: RootState) => state.categories.categories);

	const [activeCategory, setActiveCategory] = useState<string>("all");
	const [search, setSearch] = useState("");

	useEffect(() => {
		dispatch(fetchGoods());
		dispatch(fetchCategories());
		dispatch(fetchCartByUserId(user?._id));
	}, [dispatch, user?._id]);


	const filteredProducts = useMemo(() => {
		const activeCategoryId = activeCategory === "all"
			? "all"
			: categories.find(c => c.name.toLowerCase() === activeCategory.toLowerCase())?._id;

		return products.filter(product => {
			const matchCategory = activeCategoryId === "all" || product.category === activeCategoryId;
			const matchSearch = product.title.toLowerCase().includes(search.trim().toLowerCase());
			return matchCategory && matchSearch;
		});
	}, [activeCategory, search, products, categories]);

	const callbacks = {
		onAdd:
			(product: Product) => {
				dispatch(addToCart({ product, userId: user?._id }));
			},
		onPlus:
			(product: CartItem) => {
				dispatch(patchAmountCart({ id: product._id, action: 'increase' }));
			},
		onMinus:
			(product: CartItem) => {
				dispatch(patchAmountCart({ id: product._id, action: 'decrease' }))
					.unwrap()
					.then(() => {
						dispatch(fetchCartByUserId(user?._id));  // Загружаем обновлённую корзину
					});
			},
		onDelete:
			(item: Product) => {
				console.log(`Удаление товара ${JSON.stringify(item.title)}`);
				dispatch(deleteProduct(item._id));
			}
	};

	const renders = {
		item:
			(item: Product) => {
				return (
					<ProductCard
						product={item}
						onAdd={callbacks.onAdd}
						onPlus={callbacks.onPlus}
						onMinus={callbacks.onMinus}
						onDelete={callbacks.onDelete}
						link={`/products/${item._id}`}
					/>
				);
			},
	};

	return (
		<PageLayout>
			<Header
				search={search}
				setSearch={setSearch}
			/>
			<div className="flex mt-[150px]">

				<CategoryTabs setActiveCategory={setActiveCategory} />

				{status === "fulfilled" && (
					filteredProducts.length > 0
						?
						<CardGrid items={filteredProducts} renderItem={renders.item} />
						:
						<div className="flex flex-col items-center justify-center col-span-3 w-full py-20 text-center text-gray-500">
							<span className="text-5xl mb-4 ">🛒</span>
							<h2 className="text-2xl font-semibold mb-2">Товар не найден</h2>
							<p className="text-sm text-gray-400">Попробуй изменить поисковый запрос или выбрать другую категорию</p>
						</div>
				)}
			</div>
		</PageLayout>
	);
};

export default React.memo(ProductsList);
