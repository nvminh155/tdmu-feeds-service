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
const allowedOrigins = ['https://feeds.tdmu.xyz', 'http://localhost:3000'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('CORS blocked'));
    },
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
