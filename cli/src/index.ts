import { exec, execSync, spawnSync } from "child_process";
import { program } from "commander";
import { exportContent } from "./export";

// add secret env var

const fs = require('fs')
require("dotenv").config({path:  ".env.secret"});

const env = process.env.NODE_ENV || 'dev'
console.log('env', env)
require("dotenv").config({path: `.env.${env}`, override: true});
require("dotenv").config({path: `.env.${env}.secret`, override: true});


program
  .command("migrate <direction>")
  .action(async (direction: "up" | "down", _options, command) => {
    if (!["up", "down"].includes(direction)) {
      throw Error("Unknown value for directoin, expected up or down");
    }

    const stdout = execSync(`dbmate ${direction}`, {
      env: {
        DATABASE_URL: process.env.DATABASE_URL + "?sslmode=disable",
        PATH: process.env.PATH,
      },
    });
    const msg = stdout.toString();
    if (msg) {
      console.log(msg);
    }
  });

program
  .command("export <project_id>")
  .option("-t, --type", "group content by type")
  .action(async (projectId, options) => {
    console.log("Initiating export for project (id: " + projectId + ")");
    exportContent(projectId, options);
  });

// dev
program.command("drop", "drops the database").action(() => null);

// debugging
program
  .command("debug:env", { hidden: true })
  .action(() => console.log(process.env));

program.parseAsync();
const options = program.opts();
