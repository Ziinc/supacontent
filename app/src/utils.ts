import { createClient } from "@supabase/supabase-js";
import { SUPABASE_API_KEY, SUPABASE_API_URL } from "./constants";

export const client = createClient(SUPABASE_API_URL, SUPABASE_API_KEY);

