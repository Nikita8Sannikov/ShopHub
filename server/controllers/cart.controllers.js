import { getCart, addToCart, patchCart } from "../service/cartService.js";

export const getCartController = async (req, res) => {
    try {
        const cart = await getCart()
        res.status(200).json(cart);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Smth wrong, try again",
                error: error.message
            })
        }
    }
}

export const addToCartController = async (req, res) => {
    try {
        const result = await addToCart(req)
        res.json(result)
    } catch (error) {
        if (error instanceof Error) {
            res.status(error.status || 500).json({
                message: error.message || "Smth wrong, try again",
                error: error.message
            })
        }
    }
}

export const patchCartController = async (req, res) => {
    try {
        const result = await patchCart(req.params.id, req.body.action);
        res.json(result)
    } catch (error) {
        if (error instanceof Error) {
            res.status(error.status || 500).json({
                message: error.message || "Smth wrong, try again",
                error: error.message
            })
        }
    }
}

export const deleteCartByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteCartById(id);
        res.json({ message: "Product removed from cart" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(error.status || 500).json({
                message: error.message || "Smth wrong, try again",
                error: error.message
            })
        }
    }
}