import { useSelector } from "react-redux";
import { Button } from "../ui/button"
import { RootState } from "@/store";
import { SeparatorDemo } from "../separator";
import { DialogDemo } from "../dialog";
import { Separator } from "../ui/separator";

interface BasketToolProps {
    callback: () => void;
}

const BasketTool = (props: BasketToolProps) => {
    const isAuth = useSelector((state: RootState) => state.auth.exists);
    const items = useSelector((state: RootState) => state.cart.items);
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
    return (
        <>
            <div className="flex flex-col">

                {/* <SeparatorDemo/> */}
                <DialogDemo />
                {/* <Button onClick={props.callback}>Корзина</Button> */}
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