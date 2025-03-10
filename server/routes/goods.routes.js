import { Router } from "express";
import Goods from "../models/Goods.js";
import { upload } from "../middleware/upload.js";
import { createProduct } from "../controllers/goods.controller.js";

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

export default router;

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
router.patch("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const {title, category, description, price, rating, image} = req.body;

		const good = await Goods.findById(id);
		if (!good) {
			res.status(404).json({ message: "User not found" });
			return;
		}
		(good.title = title),
			(good.category = category),
			(good.avatar = avatar),
			(good.description = description),
			(good.price = price),
			(good.rating = rating),
			(good.image = image),
			
			await good.save();
		res.status(200).json(good);
	} catch (e) {
		res.status(500).json({
			message: "Smth wrong, try again",
			error: e.message,
		});
	}
});

// /api/goods/:id
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const good = await Goods.findById(id);
        if (!good) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        await good.remove();
        res.status(200).json({ message: "Good deleted" });
    } catch (e) {
        res.status(500).json({
            message: "Smth wrong, try again",
            error: e.message,
        });
    }
});

router.post("/create", upload.single("image"), createProduct);
// /api/goods/create
// router.post("/create", async (req, res) => {
//     try {
//         const {title, category, description, price, rating, image} = req.body;

//         const good = new Goods({
//             title,
//             category,
//             description,
//             price,
//             rating,
//             image
//         });
//         await good.save();
//         res.status(201).json(good);
//     } catch (e) {
//         res.status(500).json({
//             message: "Smth wrong, try again",
//             error: e.message,
//         });
//     }
// });