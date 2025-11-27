"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resError = exports.resSuccess = void 0;
const resSuccess = (data, message = 'Success', statusCode = 200) => ({
    statusCode,
    message,
    data
});
exports.resSuccess = resSuccess;
const resError = (message = 'Internal server error', statusCode = 500) => ({
    statusCode,
    message
});
exports.resError = resError;
