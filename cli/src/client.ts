import { createClient } from "@supabase/supabase-js";
import {
  API_URL,
  SERVICE_ROLE_KEY,
  API_KEY,
  EMAIL,
  PASSWORD,
} from "./constants";

export const makeClient = (USER_API_KEY = null) => {
  const key = SERVICE_ROLE_KEY || API_KEY;

  return createClient(API_URL, key);
};

export const signIn = async () => {
  const client = makeClient();
  if (!SERVICE_ROLE_KEY) {
    return await client.auth.signInWithPassword({ email: EMAIL, password: PASSWORD });
  } else {
    return false;
  }
};
