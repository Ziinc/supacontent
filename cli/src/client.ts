import { createClient } from "@supabase/supabase-js";
import {
  API_URL,
  SERVICE_ROLE_KEY,
  API_KEY,
  EMAIL,
  PASSWORD,
} from "./constants";

export const makeClient = (session = null) => {
  const key = SERVICE_ROLE_KEY || API_KEY;

  return createClient(API_URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};

export const signIn = async (client) => {
  if (!SERVICE_ROLE_KEY) {
    return await client.auth.signInWithPassword({
      email: EMAIL,
      password: PASSWORD,
    });
  } else {
    return false;
  }
};
