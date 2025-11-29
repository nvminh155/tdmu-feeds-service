"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerWorkflowMiddleware = void 0;
function checkUserInGroups(user_id, groups) {
    return groups.some((group) => group.key === 'staff' && group.users.includes(user_id));
}
const STAFF_ID = 'a0a43d68-f36d-4408-af6c-5e23e617b575';
const handlerWorkflowMiddleware = async (req, res, next) => {
    try {
        const groups = [
            {
                key: 'admin',
                users: ['63d096e7-f493-4c0d-b138-3b13e24cfdd7']
            },
            {
                key: 'staff',
                users: [STAFF_ID]
            },
            {
                key: 'user',
                users: ['63d096e7-f493-4c0d-b138-3b13e24cfdd7']
            }
        ];
        // if (!checkUserInGroups(req.user_id!, groups)) {
        //   throw createHttpErr(ErrorKey.FORBIDDEN, 'You are not authorized to access this resource');
        // }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.handlerWorkflowMiddleware = handlerWorkflowMiddleware;
