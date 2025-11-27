"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const error_1 = require("../types/http/error");
const http_1 = require("../types/http");
const error_2 = require("../utils/error");
function errorHandler(errObj, req, res, next) {
    try {
        const statusCode = errObj.statusCode || http_1.EHttpStatusCode.INTERNAL_SERVER_ERROR;
        const status = errObj.status || 'UNKNOWN_ERROR';
        const message = errObj.message || error_2.ERROR_HELPER.getMessage(error_1.ErrorKey.INTERNAL_SERVER_ERROR);
        if (process.env.NODE_ENV !== 'production') {
            console.error(errObj);
        }
        res.status(status).json({
            success: false,
            data: null,
            error: {
                message,
                status,
                statusCode
            }
        });
    }
    catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(errObj);
        }
        error.message = 'Internal Server Error at errorHandler line 27';
        next(error);
    }
}
