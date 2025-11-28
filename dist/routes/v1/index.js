"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerV1 = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const news_route_1 = require("./news.route");
const router = (0, express_1.Router)();
exports.routerV1 = router;
router.use('/news', news_route_1.newsRouter);
router.get('/test2', authMiddleware_1.authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Hello World' });
});
