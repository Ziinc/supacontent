import { createClient } from "@supabase/supabase-js";
import { SUPABASE_API_KEY, SUPABASE_API_URL } from "./constants";

export const client = createClient(SUPABASE_API_URL, SUPABASE_API_KEY);
export const supacontent = createClient(SUPABASE_API_URL, SUPABASE_API_KEY, { schema: "supacontent" });

export const randomString = (num = 7) =>
  (Math.random() + 1).toString(36).substring(num);
