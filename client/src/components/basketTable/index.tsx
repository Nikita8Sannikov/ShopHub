import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useBasketGoods from "@/hooks/useBasketGoods";
import { AppDispatch, RootState } from "@/store";
import { CartItem, deleteFromCart, fetchCartByUserId, patchAmountCart } from "@/store/reducers/cart/cartSlice";

import { Button } from "../ui/button";
import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


interface BasketTableProps {
    onClose: () => void
}
export function BasketTable({ onClose }: BasketTableProps) {
    const items = useSelector((state: RootState) => state.cart.items);
    const user = useSelector((state: RootState) => state.auth.user);
    const { totalPrice, basketGoods } = useBasketGoods();
    const dispatch: AppDispatch = useDispatch();



    const callbacks = {
        onPlus:
            (item: CartItem) => {
                dispatch(patchAmountCart({ id: item._id, action: 'increase' }));
            },
        onMinus:
            (item: CartItem) => {
                dispatch(patchAmountCart({ id: item._id, action: 'decrease' }))
                    .unwrap()
                    .then(() => {
                        dispatch(fetchCartByUserId(user?._id));
                    });
            },
        removeItemAll:
            (item: CartItem) => {
                dispatch(deleteFromCart(item._id))
                    .unwrap()
                    .then(() => {
                        dispatch(fetchCartByUserId(user?._id));
                    });
            }
    };

    return (
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Товар</TableHead>
                    <TableHead>Цена</TableHead>
                    <TableHead>Количество</TableHead>
                    <TableHead className="text-right">Сумма</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {basketGoods.map((item) => (
                    <TableRow key={item?._id}>
                        <TableCell className="font-medium">
                            <Link to={`/products/${item?._id}`}
                                onClick={() => onClose()}
                            >
                                {item?.title}
                            </Link>
                        </TableCell>
                        <TableCell>${item?.price}</TableCell>
                        <TableCell>
                            <Button onClick={() => {
                                const cartItem = items.find(i => i.goodsId === item?._id);
                                if (cartItem) callbacks.onMinus(cartItem)
                            }
                            }>-</Button>
                            {item?.amount}шт.
                            <Button onClick={() => {
                                const cartItem = items.find(i => i.goodsId === item?._id);
                                if (cartItem) callbacks.onPlus(cartItem)
                            }
                            }>+</Button>
                        </TableCell>

                        <TableCell className="text-right">${((item?.price ?? 0) * (item?.amount ?? 0)).toFixed(2)}</TableCell>

                        <TableCell className="text-right"><Button onClick={() => {
                            const cartItem = items.find(i => i.goodsId === item?._id);
                            if (cartItem) callbacks.removeItemAll(cartItem)
                        }}>Удалить</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">${totalPrice.toFixed(2)}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}