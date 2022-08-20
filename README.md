# SupaContent

A self-hostable headless CMS that leverages the Supabase stack.


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
bun cli export
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