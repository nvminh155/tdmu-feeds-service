import { errTypes, ErrorKey } from '../types/http/error';
const errorMessage = (key) => {
    if (!errTypes[key])
        return errTypes[ErrorKey.INVALID_ERROR_KEY].message;
    return errTypes[key].message;
};
const errorCode = (key) => {
    if (!errTypes[key])
        return errTypes[ErrorKey.INVALID_ERROR_KEY].statusCode;
    return errTypes[key].statusCode;
};
const getObj = (key) => {
    if (!errTypes[key])
        return errTypes[ErrorKey.INVALID_ERROR_KEY];
    return errTypes[key];
};
const isErrorKey = (key) => {
    return typeof key === 'string' && Object.values(ErrorKey).includes(key);
};
export const ERROR_HELPER = {
    getMessage: errorMessage,
    getCode: errorCode,
    getObj: getObj,
    isErrorKey: isErrorKey
};
