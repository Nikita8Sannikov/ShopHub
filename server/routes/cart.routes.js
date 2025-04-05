import { Router } from "express";
import { addToCartController, getCartController, patchCartController, deleteCartByIdController } from "../controllers/cart.controllers.js";

const router = Router();

// /api/cart/cartlist
router.get("/cartlist", getCartController);

// /api/cart/add
router.post("/add", addToCartController);

// /api/cart/get-cookie
router.get("/get-cookie", (req, res) => {
    res.json({ guestId: req.cookies.xcid || null });
});

// /api/cart/:id
router.patch("/:id", patchCartController);

// /api/cart/:id
router.delete("/:id", deleteCartByIdController)

export default router