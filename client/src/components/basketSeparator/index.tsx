import { Separator } from "@/components/ui/separator"
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export function BasketSeparator() {
  const items = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  return (
    <div className="flex h-5  justify-center space-x-2">
      <div>Товаров в корзине: {items.length} </div>
      <Separator orientation="vertical" />
      <div>  Итого: ${totalPrice.toFixed(2)}</div>
    </div>

  )
}
