import { exec, execSync, spawnSync } from "child_process";
import { program } from "commander";
import { exportConteent } from "./export";

program
  .command("migrate <direction>")
  .action(async (direction: "up" | "down", _options, command) => {
    if (!["up", "down"].includes(direction)) {
      throw Error("Unknown value for directoin, expected up or down");
    }

    const stdout = execSync(`dbmate ${direction}`, {
      env: {
        DATABASE_URL: process.env.DATABASE_URL + "?sslmode=disable",
        PATH: process.env.PATH
      },
    });
    const msg = stdout.toString()
    if (msg) {
        console.log(msg)
    }
  });

program.command("export").action(async () => {
  console.log("Initiating export");
  exportConteent()
});

// dev
program.command("drop", "drops the database").action(()=> null);

// debugging
program
  .command("debug:env", { hidden: true })
  .action(() => console.log(process.env));

program.parseAsync();
const options = program.opts();
