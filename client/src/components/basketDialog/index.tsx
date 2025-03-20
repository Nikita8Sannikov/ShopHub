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
        <BasketTable onClose={() => setOpen(false)} />
        <DialogFooter>
          <Button type="submit">Оплатить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
