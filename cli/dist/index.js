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
const child_process_1 = require("child_process");
const commander_1 = require("commander");
const export_1 = require("./export");
commander_1.program
    .command("migrate <direction>")
    .action((direction, _options, command) => __awaiter(void 0, void 0, void 0, function* () {
    if (!["up", "down"].includes(direction)) {
        throw Error("Unknown value for directoin, expected up or down");
    }
    const stdout = (0, child_process_1.execSync)(`dbmate ${direction}`, {
        env: {
            DATABASE_URL: process.env.DATABASE_URL + "?sslmode=disable",
            PATH: process.env.PATH,
        },
    });
    const msg = stdout.toString();
    if (msg) {
        console.log(msg);
    }
}));
commander_1.program
    .command("export <project_id>")
    .option("-t, --type", "group content by type")
    .action((projectId, options) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Initiating export for project (id: " + projectId + ")");
    (0, export_1.exportContent)(projectId, options);
}));
// dev
commander_1.program.command("drop", "drops the database").action(() => null);
// debugging
commander_1.program
    .command("debug:env", { hidden: true })
    .action(() => console.log(process.env));
commander_1.program.parseAsync();
const options = commander_1.program.opts();
