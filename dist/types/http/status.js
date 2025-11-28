"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EHttpStatusCode = void 0;
var EHttpStatusCode;
(function (EHttpStatusCode) {
    EHttpStatusCode[EHttpStatusCode["OK"] = 200] = "OK";
    EHttpStatusCode[EHttpStatusCode["CREATED"] = 201] = "CREATED";
    EHttpStatusCode[EHttpStatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    EHttpStatusCode[EHttpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    EHttpStatusCode[EHttpStatusCode["AUTH_REQUIRED"] = 401] = "AUTH_REQUIRED";
    EHttpStatusCode[EHttpStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    EHttpStatusCode[EHttpStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    EHttpStatusCode[EHttpStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(EHttpStatusCode || (exports.EHttpStatusCode = EHttpStatusCode = {}));
