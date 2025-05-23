import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store"
import { signOut } from "@/store/reducers/auth/authSlice"
import { clearCart } from "@/store/reducers/cart/cartSlice"

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export function PopoverAvatar() {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const callbacks = {
        onLogout: () => {
            dispatch(signOut());
            dispatch(clearCart());
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            {user &&
                <PopoverContent className="w-auto">
                    <div
                        className="cursor-pointer underline"
                    >

                        {`Вы - `}
                        {user?.name}{" "}

                    </div>
                    <Button
                        onClick={callbacks.onLogout}
                    >
                        Выход
                    </Button>
                </PopoverContent>
            }
        </Popover>
    )
}

