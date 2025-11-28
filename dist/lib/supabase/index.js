import { verifySupabaseJWT } from './auth';
import { createClient } from '@supabase/supabase-js';
const sbdb = createClient(process.env.SB_PROJECT_URL, process.env.SB_SERVICE_ROLE);
const sbdbPublic = createClient(process.env.SB_PROJECT_URL, process.env.SB_ANON_KEY);
const sb = {
    verifySupabaseJWT
};
export default sb;
export { sbdb, sbdbPublic };
