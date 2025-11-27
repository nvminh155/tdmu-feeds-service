"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const error_1 = require("../types/http/error");
const createHttpResponse_1 = require("../utils/createHttpResponse");
const supabase_1 = __importDefault(require("../lib/supabase"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        throw (0, createHttpResponse_1.createHttpErr)(error_1.ErrorKey.AUTH_REQUIRED, 'Missing Authorization');
    }
    try {
        const token = authHeader.split(' ')[1];
        const decoded = yield supabase_1.default.verifySupabaseJWT(token);
        // console.log('decoded: ', decoded);
        req.user = decoded;
        req.user_id = decoded.sub;
        next();
    }
    catch (error) {
        console.error('authMiddleware error: ', error);
        throw (0, createHttpResponse_1.createHttpErr)(error_1.ErrorKey.AUTH_REQUIRED, 'Invalid Authorization');
    }
});
exports.authMiddleware = authMiddleware;
