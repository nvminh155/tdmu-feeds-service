import { ErrorKey } from '../types/http/error';
import { createHttpErr } from '../utils/createHttpResponse';
export const checkDkmhToken = (req, res, next) => {
    const authHeader = req.headers['dkmh-authorization'];
    const { access_token } = req.body;
    if (!authHeader && !access_token) {
        throw createHttpErr(ErrorKey.AUTH_REQUIRED, 'Missing Dkmh-Authorization');
    }
    // Nếu có thể thêm bước kiểm tra hợp lệ thì thêm tại đây (ví dụ decode JWT, regex, v.v.)
    next();
};
export const isExpireDkmhToken = (req, res, next) => {
    next();
};
