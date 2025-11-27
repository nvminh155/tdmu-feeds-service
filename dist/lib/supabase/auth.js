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
exports.verifySupabaseJWT = verifySupabaseJWT;
const jose_1 = require("jose");
const SB_PROJECT_URL = process.env.SB_PROJECT_URL; // https://xxx.supabase.co
// const JWKS_URL = `${SB_PROJECT_URL}/auth/v1/.well-known/jwks.json`;
const ISSUER = `${SB_PROJECT_URL}/auth/v1`;
const JWT_SECRET = process.env.JWT_SECRET;
const secret = new TextEncoder().encode(JWT_SECRET);
// Dùng remote JWKS (tự cache)
// const jwks = createRemoteJWKSet(new URL(JWKS_URL));
function verifySupabaseJWT(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const { payload } = yield (0, jose_1.jwtVerify)(token, secret, {
            issuer: ISSUER
            // audience: 'authenticated' // tuỳ cấu hình, thường không cần set
        });
        // payload.sub là user id
        return payload;
    });
}
