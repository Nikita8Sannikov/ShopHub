import { useSelector } from "react-redux";
import { RootState } from "@/store";


const useBasketGoods = () => {
    
  const goods = useSelector((state: RootState) => state.goods.data);
  const items = useSelector((state: RootState) => state.cart.items);

  const basketGoods = items.map(item => {
    const good = goods.find(good => good._id === item.goodsId);
    if (!good) {
        console.error("Товар не найден в goods:", item.goodsId);
        return null;
    }
    return { ...good, amount: item.amount };
}).filter(Boolean);

 const totalPrice = basketGoods.map(item => (item?.price ?? 0) * item?.amount).reduce((prev, next) => prev + next, 0);   
 
  return {totalPrice, basketGoods};
}

export default useBasketGoods