import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../store";
import { addItem, fetchProductsById, removeItem } from "@/store/reducers/cart/cartSlice";
import { openModal } from "@/store/reducers/modal/modalSlice";
import { Product } from "@/types/types";
import PageLayout from "@/components/page-layout";
import Header from "@/components/header";
import ProductPage from "@/components/productPage";

const ProductLayout: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const product = useSelector((state: RootState) => state.cart.product);
    const status = useSelector((state: RootState) => state.cart.status);
    const error = useSelector((state: RootState) => state.cart.error);

    useEffect(() => {
        dispatch(fetchProductsById(Number(id)));
    }, [dispatch, id]);


    const callbacks = {
        onOpen: () => {
            dispatch(openModal("basket"));
        },
        onAdd:
            (item: Product) => {
                dispatch(addItem(item));
            },
        onBack: () => {
            navigate("/");
        },
        onEdit: () => {
            navigate(`/edit/${id}`);
        },
        removeItem:
            (item: Product) => {
                console.log(`Удаление товара ${JSON.stringify(item.title)}`);
                dispatch(removeItem(item));
            },
    };

    // const renders = {
    // 	item: 
    // 		(item: Product) => {
    // 			return (
    // 				<ProductCard
    // 					product={item}
    // 					callback={callbacks.onAdd}
    // 					link={`/products/${item.id}`}
    // 				/>
    // 			);
    // 		},
    // };

    return (
        <PageLayout>
            <Header onBack={callbacks.onBack} />
            {status === "loading" && <div>Загрузка...</div>}
            {status === "failed" && <div>Ошибка: {error}</div>}
            {product && (
                <ProductPage product={product} onAdd={callbacks.onAdd} onEdit={callbacks.onEdit} onRemove={callbacks.removeItem} />
            )}
        </PageLayout>
    );
};

export default React.memo(ProductLayout);
