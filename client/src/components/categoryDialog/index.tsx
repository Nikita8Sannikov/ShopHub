import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { AppDispatch, RootState } from "@/store";
import { createCategory, deleteCategory } from "@/store/reducers/categories/categoriesSlice";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface ICategoryDialogProps {
    mode: "create" | "delete";
}

export function CategoryDialog({ mode }: ICategoryDialogProps) {
    const dispatch: AppDispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState("");
    const categories = useSelector((state: RootState) => state.categories.categories);
    const categoryObj = categories.find(c => c.name.toLowerCase() === category.toLowerCase());

    const title = mode === "create" ? "Добавить категорию" : "Удалить категорию";
    const label = mode === "create" ? "Новая Категория" : "Удаляемая Категория";
    const placeholder = mode === "create" ? "Название категории" : "Введите имя категории для удаления";
    const buttonText = mode === "create" ? "New" : "Delete";
    const buttonVariant = mode === "create" ? "outline" : "destructive";

    const handleSave = () => {
        if (!category.trim()) return;

        if (mode === "create") {
            dispatch(createCategory(category.trim()));
        } else if (mode === "delete" && categoryObj) {
            dispatch(deleteCategory(categoryObj._id));
        }

        setCategory("");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={buttonVariant} >{buttonText} Category</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-[960px] w-full overflow-y-auto overflow-x-hidden">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            {label}
                        </Label>
                        <Input
                            className="col-span-3"
                            type="text"
                            placeholder={placeholder}
                            value={category}
                            onChange={(e) => setCategory?.(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant={buttonVariant} onClick={handleSave}>{buttonText} Category</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
