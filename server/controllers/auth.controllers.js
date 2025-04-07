import { getMe, login, register, guestCartToUserCart } from "../service/authService.js";
import finalConfig from "../config/index.js";
import jwt from "jsonwebtoken";

const jwtSecret = finalConfig.jwtSecret;

export const registerController = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        console.log(email, password, name);

        await register(name, email, password);

        res.status(201).json({ message: "User created" });
    } catch (e) {
        res.status(500).json({ message: "Smth wrong, try again" });
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const guestId = req.cookies.xcid; //Получаем guestId из кукис

        const user = await login(email, password);

        // service auth.service.getcart
        await guestCartToUserCart(user._id, guestId, res);

        const token = jwt.sign({ userId: user.id }, jwtSecret, {
            expiresIn: "1h",
        });

        res.cookie("auth_token", token, {
            path: "/",
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 3600000,
            // partitioned: true, // позволяет браузеру сохранять third-party cookies (куки с другого домена) в изолированном контексте.
        });

        if (user.isAdmin) {
            res.status(200).json({
                _id: user.id,
                email: user.email,
                name: user.name,
                isAdmin: true,
            });
        } else
            res.status(200).json({
                _id: user.id,
                email: user.email,
                name: user.name,
                isAdmin: false,
            });
    } catch (e) {
        res.status(e.status || 500).json({
            message: e.message || "Smth wrong, try again"
        });
    }
}

export const logoutController = async (req, res) => {
    try {
        res.clearCookie("auth_token", {
            path: "/",
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        res.status(200).json({ message: "Logout successful" });
    } catch (e) {
        res.status(500).json({ message: "Smth wrong, try again" });
    }
}

export const getMeController = async (req, res) => {
    try {
        const token = req.cookies.auth_token;
        const result = await getMe(token);
        res.json(result)
    } catch (e) {
        console.error("Error in /me:", e);
        res.status(e.status || 500).json({
            message: e.message || "Smth wrong, try again",
            error: e.message,
        });
    }
}