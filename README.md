# SupaContent

A self-hostable headless CMS that leverages the Supabase stack.

> **Warning: Highly experimental**. Only released for the Supabase Launch Week 5 Hackathon.

> # CLICK [HERE](./app) TO ACCESS THE APP

### Why?

**User-friendly editing interface**, allowing for the developer to use their tool of choice while keeping content editors happy without needing to know any technical details.

**Dynamic content types**, allowing the developer to avoid config files and letting content managers freedom over data schema.

**Integration into existing supabase projects**, allowing existing features and apps to query the content through the same supabase client interface.

**Migrations are automatically handled**, allowing the developer to focus on the UI instead of the database/api building.

**SSR/SSG friendly**, consumers of the api can serve content over server-side rendering or through static site generation.

**No hosting lock in**, entire supabase stack can be self hosted or outsourced to a supabase(company)-managed database.

### Getting Started

Requirements:

- npm and node
- dbmate (if self-managed or platform-managed)

#### Content Editing

Proceed to https://supacontent.com, create an account, and start writing!

#### Querying

You can query the content in existing node.js apps or browser/mobile clients using supabase-js. V2 is recommended.

Relevant tables:

- `supacontent_content`
- `supacontent_content_types`
- `supacontent_projects`

Example of querying content:
```js
const {data, error} = await client.from("supacontent_content").select().eq("id", "eq", 1)
```

### CLI

This project ships with an npm CLI to allow easy management of the content and database all from the comfort of your terminal.

```bash
# install the CLI
npm i @ziinc/supacontent
```

#### Exporting

The CLI will perform a login and export the contents of a project. The project ID can be found in the url `/app/projects/:project_id`.

```
# .env in root folder
EMAIL=my@example.com
PASSWORD=my-password
```

```bash
# terminal
npx supacontent export <project-id>           # list of content in the project
npx supacontent export <project-id> --type     # list of content types, with embeded content under the content key.
```

#### Migrations

Requires DBMate to be installed. Connects to the database and performs the migrations.

```
# .env in root folder
DATABASE_URL=postgresql://....
```

```bash
npm i @ziinc/supacontent
# terminal
npx supacontent migrate up
```

> Note: if self-hosting, ensure that the static files compiled point to `https://your-site.com/app` so that routing in the app works.

### Developer

```bash
# cd ./app
bun dev                     # run admin dev server
bun run build               # build app
bun test                    # run tests

# cd .//cli
bun run build               # compile with tsc
bun test                    # run unit tests with bun
bun cli ...                 # interact with bult cli

# cli usage
bun cli migrate up
bun cli migrate down
bun cli export <project-id>
bun cli export <project-id> --type
```

#### Tech Stack
APP
- esbuild
- tailwindcss, daisy-ui
- react
- supabase js v1

CLI
- commander.js
- typescript, tsc compilation
- dbmate (for migrations)
- supabase cli (for local dev)
- supabase js v2 (for exporting)

#### Issues And Workarounds

Bun issues:

- unit testing doesn't work, no assertions, no setup/teardown. Use jest/ts-jest instead
- bun cannot directly run scripts that rely on n-api child_process, delegate to node.

Studio issues:

- does not display other schemas available inside of the database (schemas from custom migrations)

JS client issues:

- cannot access custom schema through client
  - cannot pass additional settings/headers to the underlying postgrest request (for switching schema)
  - workaround: namespace cli-managed tables on the public schema
- errors relating to RLS policies are very vague and non-specific
  - e.g. "more than one row returned by a subquery used as an expression"
  - does not actually indicate/point out that it is an RLS issue
- authenticating with user/pass on node is undocumented and not user friendly (needed kang ming to give some deep insider knowledge on the client auth)
- random ts error on v2 upgrade for client().from()
- querying docs need schema examples, how am I supposed to visualize the querying ?!?!
  - https://supabase.com/docs/reference/javascript/next/select#query-foreign-tables
- usage with vscode results in ts errors due to vscode tsdk being a different version from that which is used in node modules.
