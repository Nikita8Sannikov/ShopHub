import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import config from "config";

// Загружаем переменные окружения
dotenv.config();

// Читаем JSON-конфиг
const defaultsPath = path.resolve("config/default.json");
const defaults = JSON.parse(fs.readFileSync(defaultsPath, "utf8"));

// Читаем конфиг для CORS
const corsConfigPath = path.resolve("config/cors.json");
const corsConfig = JSON.parse(fs.readFileSync(corsConfigPath, "utf8"));

// Определяем разрешённые Origins в зависимости от среды
const allowedOrigins =
  process.env.NODE_ENV === "development"
    ? corsConfig.allowedOrigins.development
    : corsConfig.allowedOrigins.production;

// Объединяем конфиги
const finalConfig = {
    port: config.get("port") || defaults.port,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    allowedOrigins
};

export default finalConfig;