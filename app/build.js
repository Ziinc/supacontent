const esbuild = require("esbuild");
require("dotenv").config();
const watch = process.argv[2] ? true : false;
console.log(process.env.SUPABASE_API_KEY)
console.log(process.env.SUPABASE_API_URL)
const base = {
  logLevel: "info",
  bundle: true,
  outdir: "dist",
  minify: true,
  sourcemap: true,
  sourceRoot: "src",
  watch,
  define: {
    "process.env.SUPABASE_API_KEY": JSON.stringify(process.env.SUPABASE_API_KEY),
    "process.env.SUPABASE_API_URL": JSON.stringify(process.env.SUPABASE_API_URL),
  },
};
esbuild
  .build(
    Object.assign(
      {
        entryPoints: ["src/index.tsx"],
        loader: {
          ".svg": "file",
        },
      },
      base
    )
  )
  .catch(() => process.exit(1));

esbuild
  .build(
    Object.assign(
      {
        entryPoints: ["tmp/index.css"],
      },
      base
    )
  )
  .catch(() => process.exit(1));

console.log();
