"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerWorkflowMiddleware = void 0;
function checkUserInGroups(user_id, groups) {
    return groups.some((group) => group.key === 'staff' && group.users.includes(user_id));
}
const STAFF_ID = 'a0a43d68-f36d-4408-af6c-5e23e617b575';
const handlerWorkflowMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user_id);
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
});
exports.handlerWorkflowMiddleware = handlerWorkflowMiddleware;
