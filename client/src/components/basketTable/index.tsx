import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
import { AppDispatch, RootState } from "@/store";
import { addItem, removeItem, removeItemAll } from "@/store/reducers/cart/cartSlice";
import { Product } from "@/types/types";
import { Button } from "../ui/button";

interface BasketTableProps {
    onClose: () => void
}
export function BasketTable({ onClose }: BasketTableProps) {
    const items = useSelector((state: RootState) => state.cart.items);
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

    const dispatch: AppDispatch = useDispatch();

    const callbacks = {
        onAdd:
            (item: Product) => {
                dispatch(addItem(item));
            },
        removeItem:
            (item: Product) => {
                console.log(`Удаление товара ${JSON.stringify(item.title)}`);
                dispatch(removeItem(item));
            },
            removeItemAll:
            (item: Product) => {
                console.log(`Удаление товара ${JSON.stringify(item.title)}`);
                dispatch(removeItemAll(item));
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
                {items.map((item) => (
                    <TableRow key={item.id}>
                        <Link to={`/products/${item.id}`}
                            onClick={() => onClose()}
                        >
                            <TableCell className="font-medium">{item.title}</TableCell>
                        </Link>
                        <TableCell>${item.price}</TableCell>
                        <TableCell>
                            <Button onClick={() => callbacks.removeItem(item)}>-</Button>
                            {item.amount}шт.
                            <Button onClick={() => callbacks.onAdd(item)}>+</Button>
                        </TableCell>

                        <TableCell className="text-right">${item.price * item.amount}</TableCell>
                        <TableCell className="text-right"><Button onClick={() => callbacks.removeItemAll(item)}>Удалить</Button></TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">${totalPrice}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}