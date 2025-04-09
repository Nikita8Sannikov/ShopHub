import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { CartItem, Product } from '@/types/types'
import { RootState } from '@/store';

import { Button } from '../ui/button';
import ProductCardItem from '../productCardItem';
import { CardFooter } from '../ui/card';

interface ProductCardProps {
    product: Product;
    onAdd: (item: Product) => void;
    onDelete: (item: Product) => void;
    onPlus: (item: CartItem) => void;
    onMinus: (item: CartItem) => void;
    link: string;
}

const ProductCard = ({ product, onAdd, onPlus, onMinus, onDelete, link }: ProductCardProps) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const items = useSelector((state: RootState) => state.cart.items);
    const isInCart = items.some((item) => item.goodsId === product._id);
    const item = items.find((item) => item.goodsId === product._id);

    const callbacks = {
        onAdd: onAdd,
        onDelete: onDelete,
        onPlus: onPlus,
        onMinus: onMinus
    };
    return (
        <div className="flex flex-col h-full ">
            {link ? (
                <Link to={link} className="flex-grow">
                    <ProductCardItem product={product} />
                </Link>
            ) : (
                <div className="flex-grow">
                    <ProductCardItem product={product} />
                </div>
            )}
            <CardFooter className="p-0 mt-auto flex gap-2 flex-wrap">
                {isInCart && item ? (
                    <>
                        <Button onClick={() => callbacks.onMinus(item)}>-</Button>
                        <span>{item?.amount}</span>
                        <Button onClick={() => callbacks.onPlus(item)}>+</Button>
                    </>
                ) : (
                    <Button
                        onClick={() => callbacks.onAdd(product)}>
                        Добавить в корзину
                    </Button>
                )}
                {user?.isAdmin &&
                    <Button variant="destructive" onClick={() => callbacks.onDelete(product)}>Удалить из базы!</Button>
                }
            </CardFooter>
        </div>
    )
}

export default ProductCard