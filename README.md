# SupaContent

A self-hostable headless CMS that leverages the Supabase stack.

> **Warning: Highly experimental**. Only released for the Supabase Launch Week 5 Hackathon.

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

#### Exporting

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

#### Querying

You can query the content in existing node.js apps or browser/mobile clients using supabase-js. V2 is recommended.

Relevant tables:

- `supacontent_content`
- `supacontent_content_types`
- `supacontent_projects`

#### Migrations

Requires DBMate to be installed. Connects to the database and performs the migrations.

```
# .env in root folder
DATABASE_URL=postgresql://....
```

```bash
# terminal
npx supacontent migrate up
```

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
