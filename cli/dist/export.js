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
exports.exportContent = void 0;
const client_1 = require("./client");
const constants_1 = require("./constants");
const node_fs_1 = require("node:fs");
const exportContent = (projectId, options) => __awaiter(void 0, void 0, void 0, function* () {
    let client = (0, client_1.makeClient)();
    let session;
    if (!constants_1.SERVICE_ROLE_KEY) {
        console.log("Initiating login using EMAIL and PASSWORD env variables...");
        const result = yield (0, client_1.signIn)(client);
        session = result.data.session;
    }
    let data;
    if (options.type) {
        const result = yield (0, client_1.makeClient)(session)
            .from("supacontent_content_types")
            .select(`
      *, supacontent_content(*)
  `)
            .filter("project_id", "eq", projectId);
        data = result.data;
    }
    else {
        const result = yield (0, client_1.makeClient)(session)
            .from("supacontent_content")
            .select(`
      *,
      content_type:content_type_id (
          *
      )
  `)
            .filter("content_type.project_id", "eq", projectId)
            .limit(1);
        data = result.data;
    }
    //   const data = new Uint8Array(Buffer.from("Hello Node.js"));
    (0, node_fs_1.writeFile)("export.json", JSON.stringify(data), (err) => {
        if (err)
            throw err;
        console.log("The export to export.json is complete.");
    });
});
exports.exportContent = exportContent;
