import express from "express";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.routes.js";
// import usersRoutes from "./routes/users.routes.js";
import goodsRoutes from "./routes/goods.routes.js";
import finalConfig from "./config/index.js";

const app = express();

app.use(express.json()); // Миддлвар для обработки JSON-тел запросов
app.use(express.urlencoded({ extended: true })); // Миддлвар для обработки URL-кодированных запросов
app.use(cookieParser()); //Мидлвар cookie-parser разбирает cookies и делает их доступными через req.cookies

app.use("/api/auth", authRoutes);
// app.use("/api/users", usersRoutes);
app.use("/api/goods", goodsRoutes);

const PORT = process.env.PORT || 5000

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
