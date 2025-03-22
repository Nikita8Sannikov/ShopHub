import { Router } from "express";
import UsersGoods from "../models/UsersGoods.js";
import Goods from "../models/Goods.js";
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// /api/cart/cartlist
router.get("/cartlist", async (req, res) => {
    try {
        const cart = await UsersGoods.find()

        res.status(200).json(cart);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Smth wrong, try again",
                error: error.message
            })
        }
    }
})

// /api/cart/add
router.post("/add", async (req, res) => {
    try {
        let { guestId, userId, goodsId } = req.body

        if(!userId){
            // Берём guestId из куки
            guestId = guestId || req.cookies.xcid; 
        }

        if (!userId && !guestId) {
            // Генерируем новый guestId, если его нет
            guestId = uuidv4();
            res.cookie("xcid", guestId, { httpOnly: true, maxAge: 86400 * 1000 });
        }

        const cartItem = await UsersGoods.findOne(
            userId ? { userId, goodsId } : { guestId, goodsId }
        );

        if (cartItem) {
            return res.status(400).json({ message: "Product already in cart" });
        }

        const newCartItem = await UsersGoods.create({ userId, guestId, goodsId, amount: 1 });

        const product = await Goods.findById(goodsId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ 
            _id: newCartItem._id,
            goodsId: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            amount: newCartItem.amount
        });
        
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Smth wrong, try again",
                error: error.message
            })
        }
    }
})

// /api/cart/get-cookie
router.get("/get-cookie", (req, res) => {
    res.json({ guestId: req.cookies.xcid || null });
});

// /api/cart/:id
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { action } = req.body;

        const cartItem = await UsersGoods.findById(id);

        if (!cartItem) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (action === "increase") {
            cartItem.amount += 1;
        } else if (action === "decrease") {
            if (cartItem.amount > 1) {
                cartItem.amount -= 1;
            } else {
                await cartItem.deleteOne();
                return res.json({ message: "Product removed from cart" });
            }
        } else {
            return res.status(400).json({ message: "Invalid action" });
        }

        await cartItem.save();
        res.json(cartItem);


    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Smth wrong, try again",
                error: error.message
            })
        }
    }
})

// /api/cart/:id
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const cartItem = await UsersGoods.findByIdAndDelete(id);

        if (!cartItem) {
            return res.status(404).json({ message: "Product not found" })
        }

        res.json({ message: "Product removed from cart" });

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Smth wrong, try again",
                error: error.message
            })
        }
    }
})

export default router

