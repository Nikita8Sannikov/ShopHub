import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../store";
import { addToCart, fetchCartByUserId, patchAmountCart } from "@/store/reducers/cart/cartSlice";
import { fetchGoodsById } from "@/store/reducers/goods/goodsSlice";
import { CartItem, Product } from "@/types/types";
import PageLayout from "@/components/pageLayout";
import Header from "@/components/header";
import ProductPage from "@/components/productPage";
import Spinner from "@/components/spinner";

const ProductLayout: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const product = useSelector((state: RootState) => state.goods.product);
    const status = useSelector((state: RootState) => state.cart.status);
    const error = useSelector((state: RootState) => state.cart.error);
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        dispatch(fetchGoodsById(id!));
        // if (id && user?._id) {
            dispatch(fetchCartByUserId(user?._id));
        // }
    }, [dispatch, id, user?._id]);


    const callbacks = {
        onAdd:
            (product: Product) => {
                console.log(user);
                dispatch(addToCart({ product, userId: user?._id }));
            },
        onBack: () => {
            navigate("/list");
        },
        onEdit: () => {
            navigate(`/edit/${id}`);
        },
        onPlus:
            (product: CartItem) => {
                console.log("onPlus called with:", product);
                dispatch(patchAmountCart({ id: product._id, action: 'increase' }));
            },
        onMinus:
            (product: CartItem) => {
                dispatch(patchAmountCart({ id: product._id, action: 'decrease' }))
                    .unwrap()
                    .then(() => {
                        // if (user?._id) {
                            dispatch(fetchCartByUserId(user?._id));  // Загружаем обновлённую корзину
                        // } else {
                        //     console.error("User ID is undefined");
                        // }
                    });
            },
    };

    return (
        <PageLayout>
            <Header showBack={true} onBack={callbacks.onBack} />
            {status === "loading" && <div><Spinner /></div>}
            {status === "failed" && <div>Ошибка: {error}</div>}
            {product && (
                <ProductPage
                    product={product}
                    onAdd={callbacks.onAdd}
                    onEdit={callbacks.onEdit}
                    onPlus={callbacks.onPlus}
                    onMinus={callbacks.onMinus}
                />
            )}
        </PageLayout>
    );
};

export default React.memo(ProductLayout);
