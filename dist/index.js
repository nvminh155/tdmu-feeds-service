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
app.use((0, cors_1.default)(corsOptions));
app.use('/api/v1', v1_1.routerV1);
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.get('/test', (req, res) => {
    throw (0, createHttpResponse_1.createHttpErr)(error_1.ErrorKey.AUTH_REQUIRED, 'Missing access_token');
});
app.use(errorHandler_1.errorHandler);
app.listen(config_1.config.port, () => {
    console.log(`Server running on port ${config_1.config.port}`);
});
