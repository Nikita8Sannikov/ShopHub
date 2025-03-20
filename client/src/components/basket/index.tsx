import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
// import { removeItem } from '@/store/reducers/cart/cartSlice';
import { closeModal } from '@/store/reducers/modal/modalSlice';
import { Product } from '@/types/types';

import ItemBasket from '../itemBasket';
import ModalLayout from '../modalLayout';
import List from '../list';
import BasketTotal from '../basketTotal';
import { deleteFromCart } from '@/store/reducers/cart/cartSlice';

const Basket = () => {
    const dispatch: AppDispatch = useDispatch();
    const items = useSelector((state: RootState) => state.cart.items);
    console.log(items);
    
    const callbacks = {
        onClose: () => {
            dispatch(closeModal());
        },
        // removeItem:
        //     (item: Product) => {
        //         console.log(`Удаление товара ${JSON.stringify(item.title)}`);
        //         dispatch(removeItem(item));
        //     },
        removeAll:
            (item: Product) => {
                deleteFromCart(item._id);
        }
    };

    const renders = {
		itemBasket: 
			(item: Product) => {
				return (
					<ItemBasket
						item={item}
						// callback={callbacks.removeItem}
                        callback={callbacks.removeAll}
						link={`/products/${item._id}`}
						onClose={callbacks.onClose}
					/>
				);
			},
	};

    return (
        <ModalLayout title="Корзина" onClose={callbacks.onClose}>
            <List items={items} renderItem={renders.itemBasket} />
            <BasketTotal/>
        </ModalLayout>
    )
}

export default Basket