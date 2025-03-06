import { Product } from '@/types/types'
import "./style.css"
// import { Card, CardContent, CardFooter} from '../ui/card';

import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';


interface ProductCardProps {
    product: Product;
    callback: (item: Product) => void;

	link: string;
}

const ProductCard = ({ product, callback, link }: ProductCardProps) => {
    const isAuth = useSelector((state: RootState) => state.auth.exists);
    const callbacks = {
		onAdd: callback,
	};
    return (
        // products.map((product) => (
            // <div
            //     key={product.id}
            //     className="user-card"
            // >
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

                <Button 
                disabled={!isAuth} 
                onClick={() => callbacks.onAdd(product)}>
                    {isAuth ? "Добавить в корзину" : "Войдите, чтобы купить"}
                    </Button>
            </>
    )
}

export default ProductCard