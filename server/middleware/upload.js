import multer from "multer";
import path from "path";

// Указываем папку для хранения загруженных файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Файлы будут храниться в папке "uploads"
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Получаем расширение файла
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, fileName);
  },
});

// Фильтруем файлы (разрешаем только изображения)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Только изображения разрешены!"), false);
  }
};

// Настраиваем multer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Ограничение 5MB
  fileFilter,
});

export default upload;
