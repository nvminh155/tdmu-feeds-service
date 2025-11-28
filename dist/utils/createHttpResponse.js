"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpSuccess = exports.createHttpErr = void 0;
const error_1 = require("./error");
const createHttpErr = (err, message) => {
    const errObj = error_1.ERROR_HELPER.isErrorKey(err) ? error_1.ERROR_HELPER.getObj(err) : err;
    const customMessage = message ? errObj.message + ' : ' + message : errObj.message;
    return {
        ...errObj,
        message: customMessage
    };
};
exports.createHttpErr = createHttpErr;
const createHttpSuccess = (data) => {
    return {
        data,
        success: true,
        error: null
    };
};
exports.createHttpSuccess = createHttpSuccess;
