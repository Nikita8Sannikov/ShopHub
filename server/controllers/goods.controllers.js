import { getProducts, getProductsById, deleteProductById, createProduct, patchProduct } from "../service/goodsService.js";

export const getProductsController = async (req, res) => {
    try {
        const goods = await getProducts();

        res.status(200).json(goods);
    } catch (e) {
        res.status(500).json({
            message: "Smth wrong, try again",
            error: e.message,
        });
    }
}

export const getProductsByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const good = await getProductsById(id);

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
}

export const deleteProductByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const good = await deleteProductById(id);

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
}

export const createProductController = async (req, res) => {
    try {
        const { title, category, description, price, rating } = req.body;

        const good = await createProduct(title, category, description, price, rating, req.file);

        res.status(201).json(good);
    } catch (e) {
        res.status(500).json({
            message: "Smth wrong, try again",
            error: e.message,
        });
    }
};

export const patchProductController = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const { id } = req.params;

        const { title, category, description, price, rating, image } = req.body;

        const good = await patchProduct(id, title, category, description, price, rating, image);

        res.status(200).json(good);
    } catch (e) {
        res.status(e.message === "Product not found" ? 404 : 500).json({
            message: "Smth wrong, try again",
            error: e.message,
        });
    }
};