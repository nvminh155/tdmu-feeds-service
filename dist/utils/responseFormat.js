export const resSuccess = (data, message = 'Success', statusCode = 200) => ({
    statusCode,
    message,
    data
});
export const resError = (message = 'Internal server error', statusCode = 500) => ({
    statusCode,
    message
});
