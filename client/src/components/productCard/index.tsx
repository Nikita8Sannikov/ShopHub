import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Product } from '@/types/types'
import { RootState } from '@/store';

import { Button } from '../ui/button';
import ProductCardItem from '../productCardItem';
import { CardFooter } from '../ui/card';

interface ProductCardProps {
    product: Product;
    onAdd: (item: Product) => void;
    onDelete: (item: Product) => void;
    onPlus: (item: Product) => void;
    onMinus: (item: Product) => void;
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
        <>{link ? (
            <Link to={link}>
                <ProductCardItem product={product} />



            </Link>
        ) : (
            <ProductCardItem product={product} />
        )}
            <CardFooter className="flex justify-between">
                {isInCart ? (
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
                    <Button onClick={() => callbacks.onDelete(product)}>Del</Button>
                }
            </CardFooter>
        </>
    )
}

export default ProductCard