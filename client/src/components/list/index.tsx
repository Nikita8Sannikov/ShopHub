import React from "react";
import { Product } from "../../types/types";

interface ListProps {
	items: Product[];
	renderItem: (item: Product) => React.ReactNode;
}

const List = ({ items, renderItem }: ListProps) => {
	return (
		<ul style={{ listStyleType: "none" }}>
			{items.map((item: Product) => (
				<li key={item.id}>{renderItem(item)}</li>
			))}
		</ul>
	);
};

export default React.memo(List);
