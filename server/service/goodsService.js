import { PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";

import Goods from "../models/Goods.js";
import { s3 } from "../storage/s3.js";

export const getProducts = async () => {
    return await Goods.find();
};

export const getProductsById = async (id) => {
    return await Goods.findById(id);
};

export const deleteProductById = async (id) => {
    return await Goods.findByIdAndDelete(id);
};

export const createProduct = async (title, category, description, price, rating, file) => {
    // req.file содержит загруженный файл
    // /uploads/${req.file.filename} — путь к изображению 
    // const image = file ? `/uploads/${file.filename}` : null;

    let image = null;

    if (file) {
        const ext = path.extname(file.originalname);

        const fileName =
            `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

        // const objectKey = `products/${fileName}`;

        await s3.send(
            new PutObjectCommand({
                Bucket: process.env.S3_BUCKET,
                // Key: objectKey,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype,
            })
        );

        image = `${process.env.S3_PUBLIC_URL}/${objectKey}`;
    }

    const good = new Goods({
        title,
        category,
        description,
        price,
        rating,
        image //Сохраняем путь к файлу в БД
    });

    return await good.save();
};

export const patchProduct = async (id, title, category, description, price, rating, image) => {
    const good = await Goods.findById(id);

    if (!good) {
        throw new Error("Product not found");
    }

    good.title = title;
    good.category = category;
    good.description = description;
    good.price = price;
    good.rating = rating;
    good.image = image;

    return await good.save();
};