"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_HELPER = void 0;
const error_1 = require("../types/http/error");
const errorMessage = (key) => {
    if (!error_1.errTypes[key])
        return error_1.errTypes[error_1.ErrorKey.INVALID_ERROR_KEY].message;
    return error_1.errTypes[key].message;
};
const errorCode = (key) => {
    if (!error_1.errTypes[key])
        return error_1.errTypes[error_1.ErrorKey.INVALID_ERROR_KEY].statusCode;
    return error_1.errTypes[key].statusCode;
};
const getObj = (key) => {
    if (!error_1.errTypes[key])
        return error_1.errTypes[error_1.ErrorKey.INVALID_ERROR_KEY];
    return error_1.errTypes[key];
};
const isErrorKey = (key) => {
    return typeof key === 'string' && Object.values(error_1.ErrorKey).includes(key);
};
exports.ERROR_HELPER = {
    getMessage: errorMessage,
    getCode: errorCode,
    getObj: getObj,
    isErrorKey: isErrorKey
};
