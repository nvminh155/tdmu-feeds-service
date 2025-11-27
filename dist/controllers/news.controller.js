"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewsFeed = getNewsFeed;
exports.getPageProfiles = getPageProfiles;
exports.getPostImages = getPostImages;
const config_1 = require("../config");
const constants_1 = require("../constants");
const supabase_1 = require("../lib/supabase");
const http_1 = require("../types/http");
const createHttpResponse_1 = require("../utils/createHttpResponse");
async function getNewsFeed(req, res, next) {
    try {
        const { dateRange, type } = req.body;
        const query = supabase_1.sbdb
            .from('facebook_posts')
            .select('*')
            .eq('type', type ?? 'other')
            .order('converted_time', { ascending: false });
        if (dateRange.from) {
            query.gte('converted_time', dateRange.from);
        }
        if (dateRange.to) {
            query.lte('converted_time', dateRange.to);
        }
        const { data, error } = await query;
        if (error) {
            throw (0, createHttpResponse_1.createHttpErr)(http_1.ErrorKey.DB_ERROR, JSON.stringify(error));
        }
        res.json((0, createHttpResponse_1.createHttpSuccess)(data));
    }
    catch (err) {
        next(err);
    }
}
async function getPageProfiles(req, res, next) {
    try {
        const { data, error } = await supabase_1.sbdb.from('rss_profiles').select('*');
        if (error) {
            throw (0, createHttpResponse_1.createHttpErr)(http_1.ErrorKey.DB_ERROR, JSON.stringify(error));
        }
        const results = (data ?? []).reduce((acc, item) => {
            acc[item.short_name] = item;
            return acc;
        }, {});
        res.json((0, createHttpResponse_1.createHttpSuccess)(results));
    }
    catch (err) {
        next(err);
    }
}
async function getPostImages(req, res, next) {
    try {
        const { post_id } = req.body;
        const path = `posts/${post_id}`;
        const { data, error } = await supabase_1.sbdb.storage.from(constants_1.BUCKET_NAME.RSS_INFO).list(path);
        if (error) {
            throw (0, createHttpResponse_1.createHttpErr)(http_1.ErrorKey.DB_ERROR, JSON.stringify(error));
        }
        const prefixImgUrl = config_1.config.prefixPublicStoragePath + '/' + constants_1.BUCKET_NAME.RSS_INFO + '/' + path + '/';
        res.json((0, createHttpResponse_1.createHttpSuccess)(data.map((item) => prefixImgUrl + item.name)));
    }
    catch (err) {
        next(err);
    }
}
