import { useSelector } from "react-redux";

import { RootState } from "@/store";
import useBasketGoods from "@/hooks/useBasketGoods";

import { Separator } from "@/components/ui/separator"

export function BasketSeparator() {
  const items = useSelector((state: RootState) => state.cart.items);
  const { totalPrice } = useBasketGoods();

  return (
    <div className="flex h-5  justify-center space-x-2">
      <div>Товаров в корзине: {items.length} </div>
      <Separator orientation="vertical" />
      <div>  Итого: ${totalPrice.toFixed(2)}</div>
    </div>

  )
}
