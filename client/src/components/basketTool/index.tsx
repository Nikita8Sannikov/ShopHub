import { useSelector } from "react-redux";

import { RootState } from "@/store";

import { DialogDemo } from "../dialog";
import { Separator } from "../ui/separator";


const BasketTool = () => {
    const isAuth = useSelector((state: RootState) => state.auth.exists);
    const items = useSelector((state: RootState) => state.cart.items);
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
    return (
        <>
            <div className="flex flex-col">
                <DialogDemo />
                {isAuth &&

                    <div className="flex h-5  justify-center space-x-2">
                        <div>Товаров в корзине: {items.length} </div>
                        <Separator orientation="vertical" />
                        <div>  Итого: ${totalPrice}</div>
                    </div>

                }
            </div>
        </>
    )
}

export default BasketTool