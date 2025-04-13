import { Router } from "express";

import {
  getCategoriesController,
  createCategoryController,
  deleteCategoryByIdController
} from "../controllers/categories.controllers.js";

const router = Router();

// /api/categories/categorieslist
router.get("/categorieslist", getCategoriesController);

// /api/categories/create
router.post("/create", createCategoryController);

// /api/categories/:id
router.delete("/:id", deleteCategoryByIdController);

export default router;
