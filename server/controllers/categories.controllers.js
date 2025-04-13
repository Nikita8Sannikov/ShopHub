import {
    getCategories,
    createCategory,
    deleteCategoryById
} from "../service/categorisService.js";

export const getCategoriesController = async (req, res) => {
    try {
        const categories = await getCategories();
        res.status(200).json(categories);
    } catch (e) {
        res.status(500).json({
            message: "Smth wrong, try again",
            error: e.message,
        });
    }
};

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        const category = await createCategory(name);

        res.status(201).json(category);
    } catch (e) {
        res.status(500).json({
            message: "Smth wrong, try again",
            error: e.message,
        });
    }
};

export const deleteCategoryByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await deleteCategoryById(id);

        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }

        res.status(200).json({ message: "Category deleted" });
    } catch (e) {
        res.status(500).json({
            message: "Smth wrong, try again",
            error: e.message,
        });
    }
};
