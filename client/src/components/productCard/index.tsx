import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Product } from '@/types/types'
import { RootState } from '@/store';

// import { Card, CardContent, CardFooter} from '../ui/card';
import { Button } from '../ui/button';

import "./style.css"

interface ProductCardProps {
    product: Product;
    onAdd: (item: Product) => void;
    onRemove: (item: Product) => void;
    link: string;
}

const ProductCard = ({ product, onAdd, onRemove, link }: ProductCardProps) => {
    const items = useSelector((state: RootState) => state.cart.items);
    const isInCart = items.some((item) => item.id === product.id);
    const item = items.find((item) => item.id === product.id);

    const callbacks = {
        onAdd: onAdd,
        onRemove: onRemove,
    };
    return (
        <>{link ? (
            <Link to={link}>
                <img
                    src={product.image}
                    alt={`${product.title}`}
                    className="avatar"
                />
                <h2 className="name">
                    {product.title} ${product.price}
                </h2>
            </Link>
        ) : (
            <>
                <img
                    src={product.image}
                    alt={`${product.title}`}
                    className="avatar"
                />
                <h2 className="name">
                    {product.title} ${product.price}
                </h2>
            </>
        )}

            {isInCart ? (
                <>
                    <Button onClick={() => callbacks.onRemove(product)}>-</Button>
                    <span>{item?.amount}</span>
                    <Button onClick={() => callbacks.onAdd(product)}>+</Button>
                </>
            ) : (
                <Button
                    onClick={() => callbacks.onAdd(product)}>
                    Добавить в корзину
                </Button>
            )}
      

        </>
        // </div>
        // <Card className="w-[350px]">
        //     <CardContent>
        //         <form>
        //             <div className="grid w-full items-center gap-4">
        //                 <div className="flex flex-col space-y-1.5">
        //                     <img
        //                         src={product.image}
        //                         alt={`${product.title}`}
        //                         className="avatar"
        //                     />
        //                 </div>
        //                 <div className="flex flex-col space-y-2.5">
        //                     <h2 className="name">
        //                         {product.title} ${product.price}
        //                     </h2>
        //                 </div>
        //             </div>
        //         </form>
        //     </CardContent>
        //     <CardFooter className="flex justify-center">
        //         <Button variant="outline">Купить</Button>
        //     </CardFooter>
        // </Card>
        // ))
    )
}

export default ProductCard