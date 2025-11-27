"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sbdbPublic = exports.sbdb = void 0;
const auth_1 = require("./auth");
const supabase_js_1 = require("@supabase/supabase-js");
const sbdb = (0, supabase_js_1.createClient)(process.env.SB_PROJECT_URL, process.env.SB_SERVICE_ROLE);
exports.sbdb = sbdb;
const sbdbPublic = (0, supabase_js_1.createClient)(process.env.SB_PROJECT_URL, process.env.SB_ANON_KEY);
exports.sbdbPublic = sbdbPublic;
const sb = {
    verifySupabaseJWT: auth_1.verifySupabaseJWT
};
exports.default = sb;
