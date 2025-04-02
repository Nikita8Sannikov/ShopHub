import { Router } from "express";

import upload from "../middleware/upload.js";
import {
	deleteProductByIdController,
	getProductsController,
	getProductsByIdController,
	createProductController,
	patchProductController
} from "../controllers/goods.controller.js";

const router = Router();

// /api/goods/productslist
router.get("/productslist", getProductsController);

// /api/goods/:id
router.get("/:id", getProductsByIdController);

// /api/goods/:id
router.patch("/:id", upload.single("image"), patchProductController);

// /api/goods/:id
router.delete("/:id", deleteProductByIdController);

router.post("/create", upload.single("image"), createProductController);

export default router;