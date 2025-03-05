import { RootState } from "@/store";
import { memo } from "react";
import { useSelector } from "react-redux";


const BasketTotal = () => {
	const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
	return <h3>Итого: ${totalPrice}</h3>;
};

export default memo(BasketTotal);
