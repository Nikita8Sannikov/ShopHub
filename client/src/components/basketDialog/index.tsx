import { useState } from "react";

import { Button } from "@/components/ui/button"
import { BasketTable } from "../basketTable"
import {
  Dialog,
  DialogContent,
  //   DialogDescription,
    DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const columns = [
  { key: "title", label: "Товар", className: "w-[100px]" },
  { key: "price", label: "Цена" },
  { key: "amount", label: "Количество" },
  { key: "total", label: "Сумма", className: "text-right" },
  { key: "actions", label: "", className: "text-right" }
];

export function BasketDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button >Корзина</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-[960px] w-full overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Корзина</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <BasketTable onClose={() => setOpen(false)} columns={columns} />
        <DialogFooter>
          <Button type="submit">Оплатить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
