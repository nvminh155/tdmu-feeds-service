import { ERROR_HELPER } from './error';
export const createHttpErr = (err, message) => {
    const errObj = ERROR_HELPER.isErrorKey(err) ? ERROR_HELPER.getObj(err) : err;
    const customMessage = message ? errObj.message + ' : ' + message : errObj.message;
    return {
        ...errObj,
        message: customMessage
    };
};
export const createHttpSuccess = (data) => {
    return {
        data,
        success: true,
        error: null
    };
};
