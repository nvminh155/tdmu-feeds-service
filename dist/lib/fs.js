"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const fsLib = {
    path: {
        archive: 'archive'
    },
    ensureDir: (dirPath) => {
        if (!fs_1.default.existsSync(dirPath)) {
            fs_1.default.mkdirSync(dirPath, { recursive: true });
        }
    },
    publicArchivePath: (userId) => {
        return '/public/archive' + (userId ? `/${userId}` : '');
    }
};
exports.default = fsLib;
