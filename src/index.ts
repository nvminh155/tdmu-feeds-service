import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
// import { router } from "./routes";
import { config } from './config';
import { routerV1 } from './routes/v1';
import { errorHandler } from './middlewares/errorHandler';
import { ErrorKey } from './types/http/error';
import { createHttpErr } from './utils/createHttpResponse';
import { ensureDir } from './utils/esureDir';

import fsLib from './lib/fs';
import path from 'path';

ensureDir('public');
ensureDir(fsLib.path.archive);

// global.__basedir = __dirname;
const app = express();

// cấu hình CORS
const corsOptions = {
  origin: [
    'http://localhost:3000', // React/Next.js local
    'https://yourdomain.com', // domain production
    'http://192.168.43.5:3000',
    'https://feeds.tdmu.xyz'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use('/api/v1', routerV1);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/test', (req, res) => {
  throw createHttpErr(ErrorKey.AUTH_REQUIRED, 'Missing access_token');
});

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
