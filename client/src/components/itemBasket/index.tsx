import React, { memo } from "react";
import { Product } from "../../types/types";
import { Link } from "react-router-dom";
import numberFormat from "@/utils";

interface ItemProps {
	item: Product;
	callback: (item: Product) => void;
	onClose: () => void;
	link: string;
}

const ItemBasket: React.FC<ItemProps> = ({ item, callback, link, onClose }) => {
	const callbacks = {
		onRemove: callback,
		onClose: onClose,
	};
	return (
		<>
			{link ? (
				<Link to={link} onClick={() => callbacks.onClose()}>
					{item.title}
				</Link>
			) : (
				item.title
			)}



			${numberFormat(item.price)}

			шт:{numberFormat(item.amount || 0)} 


			<button onClick={() => callbacks.onRemove(item)}>Удалить</button>
		</>
	);
};

export default memo(ItemBasket);


