import { v4 as uuidv4 } from 'uuid';
import { getCart, addToCart, patchCart, deleteCartById } from "../service/cartService.js";

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
        let { guestId, userId, goodsId } = req.body

        if (!userId) {
            // Берём guestId из куки
            guestId = guestId || req.cookies.xcid;
        }

        if (!userId && !guestId) {
            // Генерируем новый guestId, если его нет
            guestId = uuidv4();
            res.cookie("xcid", guestId, {
                path: "/",
                httpOnly: true,
                maxAge: 86400 * 1000,
                sameSite: "none",
                secure: true,
            });
        }

        const result = await addToCart(userId, guestId, goodsId);
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