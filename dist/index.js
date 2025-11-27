"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import { router } from "./routes";
const config_1 = require("./config");
const v1_1 = require("./routes/v1");
const errorHandler_1 = require("./middlewares/errorHandler");
const error_1 = require("./types/http/error");
const createHttpResponse_1 = require("./utils/createHttpResponse");
const esureDir_1 = require("./utils/esureDir");
const fs_1 = __importDefault(require("./lib/fs"));
const path_1 = __importDefault(require("path"));
(0, esureDir_1.ensureDir)('public');
(0, esureDir_1.ensureDir)(fs_1.default.path.archive);
// global.__basedir = __dirname;
const app = (0, express_1.default)();
// cấu hình CORS
const corsOptions = {
    origin: [
        'http://localhost:3000', // React/Next.js local
        'https://yourdomain.com', // domain production
        'http://192.168.43.5:3000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/public', express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/' + fs_1.default.path.archive, express_1.default.static(path_1.default.join(__dirname, '../archive')));
app.use((0, cors_1.default)(corsOptions));
app.use('/api/v1', v1_1.routerV1);
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.get('/test', (req, res) => {
    throw (0, createHttpResponse_1.createHttpErr)(error_1.ErrorKey.AUTH_REQUIRED, 'Missing access_token');
});
app.use(errorHandler_1.errorHandler);
// import OpenAI from 'openai';
// const client = new OpenAI();
// app.get('/test-chat', async (req: Request, res: Response) => {
//   const response = await client.responses.create({
//     model: 'gpt-4.1',
//     input: 'Write a one-sentence bedtime story about a unicorn.'
//   });
//   console.log(response.output_text);
//   res.status(200).json({
//     message: "OK"
//   })
// });
app.listen(config_1.config.port, () => {
    console.log(`Server running on port ${config_1.config.port}`);
    fetch("https://dkmh.tdmu.edu.vn/api/pn-signin?code=eyJ1c2VybmFtZSI6InVzZXJAZ3ciLCJwYXNzd29yZCI6InlhMjkuYTBBUzNINk54WnpVdVlWbEFvNWtTRGR6QjNZY1hGbFU5ZUdsckw2QXBLNWJzWTRZQXJUSklUYUd6SFRWQ1dZVXU2aTU4UjBtb0diTFJHYVczc3Vtem1QWXF3cnRoRkpYWmduMjU3UFB0SXFnS2E3bXY3bFhDcVBjbm9YQ204cG4zUFg0bS1kZm5xNUktZTVZelBkWUIzYm44UnZrNW5WdXZvbHdBRWs4UlZReWU3WTJHcmJJTnFidE9jSFNWaG5FWXdybGV5YzhrMklBYUNnWUtBYVFTQVJjU0ZRSEdYMk1pZzJlOTBxb0xkejNaWkdXNDhiVjROQTAyMDkiLCJ1cmkiOiJodHRwczovL2RrbWgudGRtdS5lZHUudm4vIy9ob21lIn0%3D&gopage=&mgr=1", { redirect: "manual" })
        .then(res => {
        console.log(res.status); // thường là 302
        console.log(res.headers.get("location"));
    });
});
// dkmh signIn
// static signIn(De, e, t="#/", et=!1, Tt="") {
//   this.signInErrorMsg = "";
//   const Pt = new URL(window.location.href.toLowerCase());
//   let xn = JSON.stringify({
//       username: De,
//       password: e,
//       uri: Pt.origin + Pt.pathname + t
//   });
//   xn = encodeURIComponent(v.toBase64(xn)),
//   window.open(`${N.apiPrefix}pn-signin?code=${xn}&gopage=${Tt}&mgr=${et ? "1" : "0"}`, "_self")
// }
