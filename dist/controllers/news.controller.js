"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewsFeed = getNewsFeed;
exports.getPageProfiles = getPageProfiles;
exports.getPostImages = getPostImages;
exports.getPagesInfo = getPagesInfo;
exports.getFavoriteProfiles = getFavoriteProfiles;
exports.addFavoriteProfile = addFavoriteProfile;
exports.removeFavoriteProfile = removeFavoriteProfile;
exports.getTagsNews = getTagsNews;
exports.getPinnedNews = getPinnedNews;
const dayjs_1 = __importDefault(require("dayjs"));
const config_1 = require("../config");
const constants_1 = require("../constants");
const supabase_1 = require("../lib/supabase");
const http_1 = require("../types/http");
const createHttpResponse_1 = require("../utils/createHttpResponse");
async function getNewsFeed(req, res, next) {
    try {
        const { dateRange, type, searchQuery = '', isShownFavoriteOnly = false, lastDateTime = '', limit = 20 } = req.body;
        // join wwith rss_profiles
        const query = supabase_1.sbdb
            .from('facebook_posts')
            .select('*, page_info:rss_profiles!short_name (short_name, name, avatar, url)');
        query.order('converted_time', { ascending: false });
        query.eq('is_pinned', false);
        if (dateRange.from) {
            query.gte('converted_time', dateRange.from);
        }
        if (dateRange.to) {
            query.lt('converted_time', dateRange.to);
        }
        // check 7 days  to now 
        // set hour and minute to 0
        const sevenDaysAgo = (0, dayjs_1.default)().subtract(13, 'day').startOf('day').toISOString();
        console.log();
        query.gte('converted_time', sevenDaysAgo);
        if (lastDateTime) {
            const date = new Date(lastDateTime);
            query.lt('converted_time', date.toISOString());
        }
        if (searchQuery) {
            const safeQuery = searchQuery.replaceAll(',', String.raw `\,`);
            console.log('searchQuery', safeQuery);
            const q = `"%${searchQuery}%"`;
            query.or([`title.ilike.${q}`, `content.ilike.${q}`, `summarization.ilike.${q}`].join(','));
            // query.or(`title.ilike.%${safeQuery}%,content.ilike.%${safeQuery}%,`);
        }
        if (isShownFavoriteOnly) {
            const { data: favoriteProfilesData } = await supabase_1.sbdb
                .from('profiles_rss_favorites')
                .select('*')
                .eq('user_id', req.user_id ?? '')
                .eq('status', true);
            if (favoriteProfilesData) {
                query.in('short_name', favoriteProfilesData.map((item) => item.profile_short_name) ?? []);
            }
        }
        if (type && !type.includes('all')) {
            query.overlaps('tags', type
                .split(',')
                .map((item) => item.toLowerCase().trim())
                .filter((item) => item));
        }
        query.limit(5);
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
        const { data: favoriteProfilesData } = await supabase_1.sbdb
            .from('profiles_rss_favorites')
            .select('*')
            .eq('user_id', req.user_id ?? '')
            .eq('status', true);
        if (error) {
            throw (0, createHttpResponse_1.createHttpErr)(http_1.ErrorKey.DB_ERROR, JSON.stringify(error));
        }
        const results = (data ?? []).reduce((acc, item) => {
            acc[item.short_name] = {
                ...item,
                favorite_status: favoriteProfilesData?.some((favoriteProfile) => favoriteProfile.profile_short_name === item.short_name && favoriteProfile.status === true) ?? false
            };
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
        const { post_id } = req.params;
        const path = `posts/${post_id}`;
        const { data, error } = await supabase_1.sbdb.storage.from(constants_1.BUCKET_NAME.RSS_INFO).list(path);
        if (error) {
            throw (0, createHttpResponse_1.createHttpErr)(http_1.ErrorKey.DB_ERROR, JSON.stringify(error));
        }
        const prefixImgUrl = config_1.config.prefixPublicStoragePath + '/' + constants_1.BUCKET_NAME.RSS_INFO + '/' + path + '/';
        console.log(prefixImgUrl);
        res.json((0, createHttpResponse_1.createHttpSuccess)(data.map((item) => prefixImgUrl + item.name)));
    }
    catch (err) {
        next(err);
    }
}
async function getPagesInfo(req, res, next) {
    try {
        const { data, error } = await supabase_1.sbdb.from('rss_profiles').select('*');
        if (error) {
            throw (0, createHttpResponse_1.createHttpErr)(http_1.ErrorKey.DB_ERROR, JSON.stringify(error));
        }
        res.json((0, createHttpResponse_1.createHttpSuccess)(data ?? []));
    }
    catch (err) {
        next(err);
    }
}
async function getFavoriteProfiles(req, res, next) {
    try {
        const user_id = req.user_id;
        const favoriteProfilesQuery = supabase_1.sbdb
            .from('profiles_rss_favorites')
            .select(`
      *,
      rss_profile:rss_profiles!profile_short_name (
        short_name,
        name,
        avatar,
        url
      )
    `)
            .eq('user_id', user_id)
            .eq('status', true)
            .order('profile_short_name', { ascending: true })
            .limit(30);
        const { data: favoriteProfilesData, error: favoriteProfilesError } = await favoriteProfilesQuery;
        if (favoriteProfilesError)
            throw (0, createHttpResponse_1.createHttpErr)(http_1.ErrorKey.DB_ERROR, favoriteProfilesError.message);
        res.json((0, createHttpResponse_1.createHttpSuccess)(favoriteProfilesData));
    }
    catch (err) {
        next(err);
    }
}
async function addFavoriteProfile(req, res, next) {
    try {
        const { profileShortName } = req.params;
        const user_id = req.user_id;
        const { data, error } = await supabase_1.sbdb
            .from('profiles_rss_favorites')
            .upsert({ user_id, profile_short_name: profileShortName, status: true, created_at: new Date().toISOString() }, { onConflict: 'user_id,profile_short_name' });
        if (error) {
            throw (0, createHttpResponse_1.createHttpErr)(http_1.ErrorKey.DB_ERROR, JSON.stringify(error));
        }
        res.json((0, createHttpResponse_1.createHttpSuccess)(data ?? []));
    }
    catch (err) {
        next(err);
    }
}
async function removeFavoriteProfile(req, res, next) {
    try {
        const { profileShortName } = req.params;
        const user_id = req.user_id;
        const { data, error } = await supabase_1.sbdb
            .from('profiles_rss_favorites')
            .update({ status: false })
            .eq('user_id', user_id)
            .eq('profile_short_name', profileShortName);
        if (error) {
            throw (0, createHttpResponse_1.createHttpErr)(http_1.ErrorKey.DB_ERROR, JSON.stringify(error));
        }
        res.json((0, createHttpResponse_1.createHttpSuccess)(data ?? []));
    }
    catch (err) {
        next(err);
    }
}
async function getTagsNews(req, res, next) {
    try {
        const { data, error } = await supabase_1.sbdb.from('scraped_post_tags').select('*');
        if (error) {
            throw (0, createHttpResponse_1.createHttpErr)(http_1.ErrorKey.DB_ERROR, JSON.stringify(error));
        }
        res.json((0, createHttpResponse_1.createHttpSuccess)(data ?? []));
    }
    catch (err) {
        next(err);
    }
}
async function getPinnedNews(req, res, next) {
    try {
        const { data, error } = await supabase_1.sbdb
            .from('facebook_posts')
            .select(`*,
        
        page_info:rss_profiles!short_name (
          short_name,
          name,
          avatar,
          url
        )
        `)
            .eq('is_pinned', true)
            .order('converted_time', { ascending: false });
        if (error) {
            throw (0, createHttpResponse_1.createHttpErr)(http_1.ErrorKey.DB_ERROR, JSON.stringify(error));
        }
        res.json((0, createHttpResponse_1.createHttpSuccess)(data ?? []));
    }
    catch (err) {
        next(err);
    }
}
