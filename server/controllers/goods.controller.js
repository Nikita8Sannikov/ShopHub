import Goods from "../models/Goods.js";

export const createProduct = async (req, res) => {
    try {
        const { title, category, description, price, rating } = req.body;
        // req.file содержит загруженный файл
        // /uploads/${req.file.filename} — путь к изображению
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const good = new Goods({
            title,
            category,
            description,
            price,
            rating,
            image //Сохраняем путь к файлу в БД
        });

        await good.save();
        res.status(201).json(good);
    } catch (e) {
        res.status(500).json({
            message: "Smth wrong, try again",
            error: e.message,
        });
    }
};

export const patchProduct = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const { id } = req.params;

        const { title, category, description, price, rating, image } = req.body;

        const good = await Goods.findById(id);
        if (!good) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        (good.title = title),
            (good.category = category),
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
};