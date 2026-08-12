import multer from "multer";
import path from "path";

// Указываем папку для хранения загруженных файлов
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Файлы будут храниться в папке "uploads"
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname); // Получаем расширение файла
//     const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
//     cb(null, fileName);
//   },
// });

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
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Ограничение 5MB
  fileFilter,
});

export default upload;

// import multer from "multer";

// import { MB_1, MULTER_MAX_FILE_SIZE, MULTER_MAX_FILES_COUNT } from "@utils/constants";

// // Конфигурация multer
// const multerConfig = {
// 	storage: multer.memoryStorage(), // Хранилище файлов
// 	limits: {
// 		fileSize: MB_1 * MULTER_MAX_FILE_SIZE, // Ограничение на размер одного файла в 10 МБ
// 		files: MULTER_MAX_FILES_COUNT, // Ограничение на количество файлов за один запрос
// 	},
// };

// export default multerConfig;


// // Частный мидлвар. Сжимаем изображение аватара
// async sharpAvatar(req: Request, _: Response, next: NextFunction) {
//   logger.debug("sharpAvatar [req.file=%j]", req.file);

//   try {
//     // Сжимаем переданный аватар пользователя и дублируем его на диск в раздел "Фотографии"
//     const { folderPath, outputFile } = await createSharpedImage({
//       ...req.file!,
//       fieldname: "photo",
//     });
//     req.sharpedPhotoUrl = path.join(folderPath, outputFile);

//     // Сжимаем переданный аватар пользователя
//     req.sharpedAvatarUrl = await this._getSharpedUrl(req);

//     next();
//   } catch (error) {
//     next(error);
//   }
// }









// import fs from "fs";
// import path from "path";
// import sharp from "sharp";
// import { v4 as uuid } from "uuid";

// import { t } from "@service/i18n";
// import Logger from "@service/logger";
// import { ASSETS_DIR, SHARP_QUALITY } from "@utils/constants";

// const logger = Logger("utils/files");
// const JPEG_FORMAT = "jpeg";
// const ROOT_PATH = path.join(__dirname, "../", ASSETS_DIR);

// // Проверка, является ли файл изображением
// export const isImage = (filename: string) => {
// 	logger.debug("isImage [filename=%s]", filename);

// 	const fileExt = filename.split(".").pop();
// 	const imgExts = [ "png", "jpeg", "jpg" ];

// 	return fileExt ? imgExts.includes(fileExt) : false;
// };
// // Обрезаем качество изображению до 80% и сохраняем его на диск сервера
// export async function createSharpedImage(file: Express.Multer.File) {
// 	logger.debug("createSharpedImage [file=%j]", file);

// 	const folderPath = `/${file.fieldname}s/`;
// 	const outputFile = file.fieldname + "-" + uuid() + "." + file.mimetype.split("/").pop();

// 	// Проверка на наличие папки "assets"
// 	if (!fs.existsSync(ROOT_PATH)) {
// 		fs.mkdirSync(ROOT_PATH);
// 	}

// 	// Проверка на наличие папок "avatars"/"photos"/
// 	if (!fs.existsSync(path.join(ROOT_PATH, folderPath))) {
// 		fs.mkdirSync(path.join(ROOT_PATH, folderPath));
// 	}

// 	/**
// 	 * Используем библиотеку sharp для:
// 	 * 1) сохранения метаданных изображения
// 	 * 2) изменения формата на "jpeg"
// 	 * 3) установки качества изображению 80%
// 	 * 4) вывод в новый файл
// 	 */
// 	await sharp(file.buffer)
// 		.withMetadata()
// 		.toFormat(JPEG_FORMAT)
// 		.jpeg({ quality: SHARP_QUALITY, progressive: true })
// 		.toFile(path.join(ROOT_PATH, folderPath, outputFile));

// 	return { folderPath, outputFile };
// }