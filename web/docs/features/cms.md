---
sidebar_position: 1
---

# Content Management System

### Why?

**User-friendly editing interface**, allowing for the developer to use their tool of choice while keeping content editors happy without needing to know any technical details.

**Dynamic content types**, allowing the developer to avoid config files and letting content managers freedom over data schema.

**SSR/SSG friendly**, consumers of the api can serve content over server-side rendering or through static site generation.

### Querying

You can query the content in existing node.js apps or browser/mobile clients using supabase-js. V2 is recommended.

Relevant tables:

- `supacontent_content`
- `supacontent_content_types`
- `supacontent_projects`

Example of querying content:

```js
const { data, error } = await client
  .from("supacontent_content")
  .select()
  .eq("id", "eq", 1);
```
