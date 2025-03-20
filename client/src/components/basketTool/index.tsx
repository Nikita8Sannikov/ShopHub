import { BasketDialog } from "../basketDialog";
import { BasketSeparator } from "../basketSeparator";


const BasketTool = () => {
    return (
        <div className="flex flex-col">
            <BasketDialog />
            <BasketSeparator />
        </div>
    )
}

export default BasketTool