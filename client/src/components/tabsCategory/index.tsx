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
    <Tabs defaultValue="all" className="w-[400px]" onValueChange={(value) => setActiveCategory(value as Category)}>
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="men's clothing">For Men</TabsTrigger>
        <TabsTrigger value="women's clothing">For Women</TabsTrigger>
        <TabsTrigger value="jewelery">Jewelry</TabsTrigger>
        <TabsTrigger value="electronics">Electronics</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
