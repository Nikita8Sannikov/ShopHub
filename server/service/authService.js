import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import UserGoods from "../models/UsersGoods.js";
import User from "../models/User.js";
import finalConfig from "../config/index.js";

const jwtSecret = finalConfig.jwtSecret;

export async function guestCartToUserCart(userId, guestId, res) {

    if (!guestId) return;

    // Получаем товары гостя
    const guestCartItems = await UserGoods.find({ guestId });

    for (const item of guestCartItems) {
        // Проверяем, есть ли уже такой товар у пользователя
        const existingItem = await UserGoods.findOne({ userId, goodsId: item.goodsId });

        if (existingItem) {
            // Если товар уже есть, обновляем количество
            await UserGoods.updateOne(
                { _id: existingItem._id },
                { $inc: { amount: item.amount } }
            );

            // Удаляем дублирующийся товар гостя
            await UserGoods.deleteOne({ _id: item._id });
        } else {
            // Если товара нет у пользователя, просто привязываем его к userId
            await UserGoods.updateOne(
                { _id: item._id },
                { $set: { userId, guestId: null } }
            );
        }
    }

    res.clearCookie("xcid", { path: "/" }); // Удаляем guestId из куков
}

export const login = async (email, password) => {
    const user = await User.findOne({ email });
    console.log(user);
    console.log(email);


    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        const error = new Error("Wrong password or login")
        error.status = 401;
        throw error;
    }

    return user;
}

export const register = async (name, email, password) => {
    const candidate = await User.findOne({ email });

    if (candidate) {
        const error = new Error("This user already exists");
        error.status = 400;
        throw error;
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = new User({
        name,
        email,
        password: hashPassword,
    });

    await user.save();
}

export const getMe = async (token) => {
    if (!token) {
        const error = new Error("No token provided");
        error.status = 401;
        throw error;
    }

    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }

    return user;
}