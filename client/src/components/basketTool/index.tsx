import { useSelector } from "react-redux";

import { RootState } from "@/store";

import { BasketDialog } from "../basketDialog";
import { BasketSeparator } from "../basketSeparator";


const BasketTool = () => {
    const isAuth = useSelector((state: RootState) => state.auth.exists);

    return (
        <div className="flex flex-col">
            <BasketDialog />
            {isAuth &&
                <BasketSeparator />
            }
        </div>
    )
}

export default BasketTool