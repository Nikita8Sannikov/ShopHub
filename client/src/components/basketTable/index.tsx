import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useBasketGoods from "@/hooks/useBasketGoods";
import { AppDispatch, RootState } from "@/store";
import { deleteFromCart, fetchCartByUserId, patchAmountCart } from "@/store/reducers/cart/cartSlice";
import { CartItem } from "@/types/types"

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
    columns: { key: string, label: string, className?: string }[]
}

export function BasketTable({ onClose, columns }: BasketTableProps) {
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
                        dispatch(fetchCartByUserId(user?._id ?? ""));
                    });
            },
        removeItemAll:
            (item: CartItem) => {
                dispatch(deleteFromCart(item._id))
                    .unwrap()
                    .then(() => {
                        dispatch(fetchCartByUserId(user?._id ?? ""));
                    });
            }
    };

    return (
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead key={column.key} className={column.className}>
                            {column.label}
                        </TableHead>
                    ))}
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
                        <TableCell className="text-center">${item?.price}</TableCell>
                        <TableCell className="text-center flex items-center gap-2 justify-center">
                            <Button size="sm" variant="outline" onClick={() => {
                                const cartItem = items.find(i => i.goodsId === item?._id);
                                if (cartItem) callbacks.onMinus(cartItem)
                            }
                            }>-</Button>
                            <span className="w-[50px] text-center font-mono">{item?.amount}шт.</span>
                            <Button size="sm" variant="outline" onClick={() => {
                                const cartItem = items.find(i => i.goodsId === item?._id);
                                if (cartItem) callbacks.onPlus(cartItem)
                            }
                            }>+</Button>
                        </TableCell>

                        <TableCell className="text-right">${((item?.price ?? 0) * (item?.amount ?? 0)).toFixed(2)}</TableCell>

                        <TableCell className="text-right">
                            <Button variant="destructive" onClick={() => {
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