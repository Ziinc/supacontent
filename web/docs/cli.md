---
sidebar_position: 3
---

# NPM Package

The NPM package ships with a CLI.
#### Installation

```bash
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
