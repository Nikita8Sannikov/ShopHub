import { Router } from "express";
import Goods from "../models/Goods.js";
import upload from "../middleware/upload.js";
import { createProduct, patchProduct } from "../controllers/goods.controller.js";

const router = Router();

// /api/goods/productslist
router.get("/productslist", async (req, res) => {
	try {
		const goods = await Goods.find()

		res.status(200).json(goods);
	} catch (e) {
		res.status(500).json({
			message: "Smth wrong, try again",
			error: e.message,
		});
	}
});

// /api/goods/:id
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		
		const good = await Goods.findById(id);
		
		if (!good) {
			res.status(404).json({ message: "User not found" });
			return;
		}
		res.status(200).json(good);
	} catch (e) {
		res.status(500).json({
			message: "Smth wrong, try again",
			error: e.message,
		});
	}
});

// /api/goods/:id
router.patch("/:id", upload.single("image"), patchProduct);

// /api/goods/:id
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		
		const good = await Goods.findByIdAndDelete(id);
		
        if (!good) {
			res.status(404).json({ message: "Product not found" });
            return;
        }
		
        res.status(200).json({ message: "Good deleted" });
    } catch (e) {
		res.status(500).json({
			message: "Smth wrong, try again",
            error: e.message,
        });
    }
});

router.post("/create", upload.single("image"), createProduct);

export default router;