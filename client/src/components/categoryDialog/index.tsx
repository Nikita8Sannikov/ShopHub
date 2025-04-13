import { useState } from "react";

import { Button } from "@/components/ui/button"
// import { BasketTable } from "../basketTable"
import {
    Dialog,
    DialogContent,
    //   DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addCategory } from "@/store/reducers/categories/categoriesSlice";

export function CategoryDialog() {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState("");
    const dispatch: AppDispatch = useDispatch();

    const handleSave = () => {
        if (category.trim()) {
            dispatch(addCategory(category.trim()));
            setCategory("");
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"}>New Category</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-[960px] w-full overflow-y-auto overflow-x-hidden">
                <DialogHeader>
                    <DialogTitle>Добавить категорию</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Новая Категория
                        </Label>
                        <Input
                            className="col-span-3"
                            type="text"
                            placeholder="Я ищу.."
                            value={category}
                            onChange={(e) => setCategory?.(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
