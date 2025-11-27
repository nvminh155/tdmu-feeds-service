import { Router } from 'express';
import { authMiddleware } from '~/middlewares/authMiddleware';

import { newsRouter } from './news.route';
const router = Router();

router.use('/news', newsRouter);
router.get('/test2', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

export { router as routerV1 };
