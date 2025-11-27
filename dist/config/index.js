"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PAGINATION = exports.MODES = exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// import nodemailer from 'nodemailer'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv_1.default.config();
if (envFound.error && process.env.VERCEL !== "1") {
    throw new Error("Couldn't find .env file");
}
// Create a transporter for sending emails
// export const transporter = nodemailer.createTransport({
//   service: process.env.SERVICE_EMAIL,
//   auth: {
//     user: process.env.USER_AUTH,
//     pass: process.env.PASS_AUTH
//   }
// })
exports.config = {
    port: process.env.PORT || 8087,
    dbUrl: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    logs: {
        // Used by winston logger
        level: process.env.LOG_LEVEL || 'silly'
    },
    api: {
        prefix: '/api'
    },
    emails: {
        // SENDGRID email credentials
        apiKey: process.env.SENDGRID_API_KEY,
        sender: process.env.SENDGRID_SENDER
    },
    supabaseUrl: process.env.SB_PROJECT_URL,
    supabaseServiceRole: process.env.SB_SERVICE_ROLE,
    prefixPublicStoragePath: process.env.SB_PROJECT_URL + '/storage/v1/object/public'
};
var MODES;
(function (MODES) {
    MODES["TEST"] = "test";
    MODES["LOCAL"] = "local";
    MODES["DEV"] = "development";
    MODES["PROD"] = "production";
})(MODES || (exports.MODES = MODES = {}));
exports.DEFAULT_PAGINATION = {
    page: 1,
    pageSize: 10,
    total: 0
};
