import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Category } from "@/modules/users/productsList"

interface TabsCategoryProps {
  setActiveCategory: (category: Category ) => void
}

export function TabsCategory({ setActiveCategory }: TabsCategoryProps) {
  return (
    <Tabs defaultValue="all"
    //  className="w-[400px]"
    className=""
      onValueChange={(value) => setActiveCategory(value as Category)}>
      <TabsList className="grid w-full grid-cols-2  bg-transparent sticky top-[130px] ">
        <TabsTrigger className="p-10 m-3" value="all">All</TabsTrigger>
        <TabsTrigger className="p-10 m-3" value="men's clothing">For Men</TabsTrigger>
        <TabsTrigger className="p-10 m-3" value="women's clothing">For Women</TabsTrigger>
        <TabsTrigger className="p-10 m-3" value="jewelery">Jewelry</TabsTrigger>
        <TabsTrigger className="p-10 m-3" value="electronics">Electronics</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
