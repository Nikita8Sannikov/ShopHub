import { Product } from '@/types/types';

interface ProductCardItemProps {
    product: Product
}
const ProductCardItem = ({ product }: ProductCardItemProps) => {
    return (
        <form>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <img
                        src={product.image}
                        alt={`${product.title}`}
                        className="w-[100px] h-[100px] rounded-full"
                    />
                </div>
                <div className="flex flex-col space-y-2.5">
                    <h2 className="mt-[10px] text-[1.2rem] text-gray-800">
                        {product.title} ${product.price}
                    </h2>
                </div>
            </div>
        </form>
    )
}

export default ProductCardItem