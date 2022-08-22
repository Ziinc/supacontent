"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.makeClient = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const constants_1 = require("./constants");
const makeClient = (session = null) => {
    const key = constants_1.SERVICE_ROLE_KEY || constants_1.API_KEY;
    return (0, supabase_js_1.createClient)(constants_1.API_URL, key, {
        auth: { persistSession: false, autoRefreshToken: false },
    });
};
exports.makeClient = makeClient;
const signIn = (client) => __awaiter(void 0, void 0, void 0, function* () {
    if (!constants_1.SERVICE_ROLE_KEY) {
        return yield client.auth.signInWithPassword({
            email: constants_1.EMAIL,
            password: constants_1.PASSWORD,
        });
    }
    else {
        return false;
    }
});
exports.signIn = signIn;
