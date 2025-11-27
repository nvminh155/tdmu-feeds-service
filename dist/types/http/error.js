"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errTypes = exports.ErrorKey = void 0;
const status_1 = require("./status");
var ErrorKey;
(function (ErrorKey) {
    ErrorKey["BAD_REQUEST"] = "BAD_REQUEST";
    ErrorKey["AUTH_REQUIRED"] = "AUTH_REQUIRED";
    ErrorKey["FORBIDDEN"] = "FORBIDDEN";
    ErrorKey["NOT_FOUND"] = "NOT_FOUND";
    ErrorKey["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    ErrorKey["INVALID_ERROR_KEY"] = "INVALID_ERROR_KEY";
    ErrorKey["DKMH_EXPIRED_TOKEN"] = "DKMH_EXPIRED_TOKEN";
    ErrorKey["DKMH_LOGIN_FAILED"] = "DKMH_LOGIN_FAILED";
    ErrorKey["DB_ERROR"] = "DB_ERROR";
    ErrorKey["MISSING_KEY"] = "MISSING_KEY";
})(ErrorKey || (exports.ErrorKey = ErrorKey = {}));
exports.errTypes = {
    BAD_REQUEST: {
        status: 400,
        statusCode: status_1.EHttpStatusCode.BAD_REQUEST,
        message: 'Bad Request'
    },
    AUTH_REQUIRED: {
        status: 401,
        statusCode: status_1.EHttpStatusCode.AUTH_REQUIRED,
        message: 'Authentication Required'
    },
    FORBIDDEN: {
        status: 403,
        statusCode: status_1.EHttpStatusCode.FORBIDDEN,
        message: 'Forbidden'
    },
    NOT_FOUND: {
        status: 404,
        statusCode: status_1.EHttpStatusCode.NOT_FOUND,
        message: 'Not Found'
    },
    INTERNAL_SERVER_ERROR: {
        status: 500,
        statusCode: status_1.EHttpStatusCode.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error'
    },
    INVALID_ERROR_KEY: {
        status: 500,
        statusCode: status_1.EHttpStatusCode.INTERNAL_SERVER_ERROR,
        message: 'Invalid error key'
    },
    DKMH_EXPIRED_TOKEN: {
        status: 1111,
        statusCode: status_1.EHttpStatusCode.AUTH_REQUIRED,
        message: 'DKMH expired token'
    },
    DKMH_LOGIN_FAILED: {
        status: 403,
        statusCode: status_1.EHttpStatusCode.FORBIDDEN,
        message: 'DKMH login failed'
    },
    DB_ERROR: {
        status: 500,
        statusCode: status_1.EHttpStatusCode.INTERNAL_SERVER_ERROR,
        message: 'Database error'
    },
    MISSING_KEY: {
        status: 400,
        statusCode: status_1.EHttpStatusCode.BAD_REQUEST,
        message: 'Missing key'
    }
};
// export type TErrorKey = keyof typeof errTypes;
