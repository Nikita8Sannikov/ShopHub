import express from "express";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.routes.js";
// import usersRoutes from "./routes/users.routes.js";
import goodsRoutes from "./routes/goods.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import finalConfig from "./config/index.js";
import cors from "cors";

const app = express();
const allowedOrigins = finalConfig.allowedOrigins;

app.use(cors({
	origin: (origin, callback) => {
		console.log(origin);

		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true
})); // Включает CORS для всех запросов

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Allowed Origins:", finalConfig.allowedOrigins);

app.use(express.json()); // Миддлвар для обработки JSON-тел запросов
app.use(express.urlencoded({ extended: true })); // Миддлвар для обработки URL-кодированных запросов
app.use(cookieParser()); //Мидлвар cookie-parser разбирает cookies и делает их доступными через req.cookies

app.use("/api/auth", authRoutes);
// app.use("/api/users", usersRoutes);
app.use("/api/goods", goodsRoutes);
app.use("/api/cart", cartRoutes);
//раздаём папку "uploads" как статические файлы
app.use("/uploads", express.static("uploads"));

const PORT = finalConfig.port|| 5001;

async function start() {
	try {
		await mongoose.connect(finalConfig.mongoUri, {});
		app.listen(PORT, () =>
			console.log(`App has been started on port ${PORT}`)
		);
	} catch (e) {
		if (e instanceof Error) {
			console.log("Server Error", e.message);
		} else {
			console.log("Server Error", e);
		}
		process.exit(1);
	}
}

start();
