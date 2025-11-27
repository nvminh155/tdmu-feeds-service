"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFetchResponse = handleFetchResponse;
const http_1 = require("../types/http");
const createHttpResponse_1 = require("./createHttpResponse");
function handleFetchResponse(data) {
    if (data.result === false) {
        if (data.code === 400 && data.message === 'expired')
            throw (0, createHttpResponse_1.createHttpErr)(http_1.ErrorKey.DKMH_EXPIRED_TOKEN, 'The token is expired');
        throw {
            code: data.code,
            message: data.message ?? 'Unknown error from remote server'
        };
    }
    if (data.code === 403)
        throw (0, createHttpResponse_1.createHttpErr)(http_1.ErrorKey.DKMH_LOGIN_FAILED, 'Login failed');
    return data.data;
}
