import { useSelector } from "react-redux";

import { Category } from "@/modules/users/productsList"
import { RootState } from "@/store";
import { CategoryDialog } from "../categoryDialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface CategoryTabsProps {
  setActiveCategory: (category: Category) => void;
}

export function CategoryTabs({ setActiveCategory }: CategoryTabsProps) {

  const user = useSelector((state: RootState) => state.auth.user);
  const categories = useSelector((state: RootState) => state.categories.categories);

  return (
    <Tabs defaultValue="all"
      className="w-[300px] shrink-0"
      onValueChange={(value) => setActiveCategory(value as Category)}>
      <TabsList className="grid w-full grid-cols-2  bg-transparent sticky top-[130px] ">

        {categories.map((category) => (
          <TabsTrigger key={category._id} className="p-10 m-3" value={category.name.toLowerCase()}>{category.name}</TabsTrigger>
        ))}
        
        {user?.isAdmin &&
          <div className="flex flex-col gap-2">
            <CategoryDialog mode="create"/>
            <CategoryDialog mode="delete"/>
          </div>
        }
      </TabsList>
    </Tabs>
  )
}
