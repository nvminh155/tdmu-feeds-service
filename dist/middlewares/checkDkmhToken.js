"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExpireDkmhToken = exports.checkDkmhToken = void 0;
const error_1 = require("../types/http/error");
const createHttpResponse_1 = require("../utils/createHttpResponse");
const checkDkmhToken = (req, res, next) => {
    const authHeader = req.headers['dkmh-authorization'];
    const { access_token } = req.body;
    if (!authHeader && !access_token) {
        throw (0, createHttpResponse_1.createHttpErr)(error_1.ErrorKey.AUTH_REQUIRED, 'Missing Dkmh-Authorization');
    }
    // Nếu có thể thêm bước kiểm tra hợp lệ thì thêm tại đây (ví dụ decode JWT, regex, v.v.)
    next();
};
exports.checkDkmhToken = checkDkmhToken;
const isExpireDkmhToken = (req, res, next) => {
    next();
};
exports.isExpireDkmhToken = isExpireDkmhToken;
