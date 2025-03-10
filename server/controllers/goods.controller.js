import Goods from "../models/Goods.js";

export const createProduct = async (req, res) => {
    try {
        const {title, category, description, price, rating} = req.body;
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