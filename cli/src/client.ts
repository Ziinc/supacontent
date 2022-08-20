import { createClient } from "@supabase/supabase-js";
import { API_URL, SERVICE_ROLE_KEY } from "./constants";

export const makeClient = () => createClient(API_URL, SERVICE_ROLE_KEY);
