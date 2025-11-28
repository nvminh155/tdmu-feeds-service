"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const esureDir_1 = require("../utils/esureDir");
const fs_2 = __importDefault(require("./fs"));
function getUniqueFileName(folderPath, baseName, ext) {
    let fileName = baseName + ext;
    let counter = 1;
    while (fs_1.default.existsSync(path_1.default.join(folderPath, fileName))) {
        fileName = `${baseName}_v${counter}${ext}`;
        counter++;
    }
    return fileName;
}
const storageUpload = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.params.userId || req.user_id; // Lấy từ URL param
        if (!userId) {
            return cb(new Error('Missing user_id'), '');
        }
        const uploadPath = path_1.default.join(fs_2.default.path.archive, userId);
        (0, esureDir_1.ensureDir)(uploadPath);
        // Tạo thư mục nếu chưa tồn tại
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const userId = req.params.userId || req.user_id;
        const ext = path_1.default.extname(file.originalname);
        const baseName = path_1.default.basename(file.originalname, ext); // giữ nguyên tên gốc
        const uploadPath = path_1.default.join(fs_2.default.path.archive, userId);
        const uniqueName = getUniqueFileName(uploadPath, baseName, ext);
        cb(null, uniqueName);
    }
});
const multerLib = {
    storageUpload,
    getUniqueFileName
};
exports.default = multerLib;
