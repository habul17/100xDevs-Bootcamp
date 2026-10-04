# 100xDevs Bootcamp

Backend projects I built during the [100xDevs](https://100xdevs.com) cohort in July 2026,
in the order I built them. They start with an Express server that keeps notes in an array
and work up to JWT auth, MongoDB and PostgreSQL.

Each folder used to be its own repository. Their full commit history is kept here, so
`git log -- 03-todo-app-with-mongodb` shows how that project was built step by step.

| # | Project | What it adds | Stack |
|---|---|---|---|
| 01 | [notes-app-basic](01-notes-app-basic) | A first REST API: create and list notes, plus an HTML page that calls it | Express |
| 02 | [notes-app-with-auth](02-notes-app-with-auth) | Signup, signin and an auth middleware; each user sees only their own notes | Express · JWT |
| 03 | [todo-app-with-mongodb](03-todo-app-with-mongodb) | Data that survives a restart, with Mongoose models | Express · JWT · MongoDB |
| 04 | [trello-basic](04-trello-basic) | Organisations with an admin and members, and checks on who may change what | Express · JWT |
| 05 | [trello-with-mongodb](05-trello-with-mongodb) | The same organisation model on MongoDB, using `$addToSet` and `$pull` | Express · JWT · MongoDB |
| 06 | [todo-with-postgres](06-todo-with-postgres) | Raw SQL through the `pg` driver | Express · JWT · PostgreSQL |

## Revisited later

After the cohort I went back through these with what I had learned since, and fixed the
problems I could now see. The originals are still in the history; each fix is its own commit.

- **Plain-text passwords.** All five apps with logins stored passwords as typed. They now
  store bcrypt hashes and compare against those at signin.
- **SQL injection in 06.** Queries were built by pasting user input into the SQL string, so
  an email like `sam@example.com' --` signed in as that user with any password. They now
  use `$1`, `$2` placeholders, which keep the input out of the SQL.
- **06 did not start.** Signin used `await` outside an `async` function.
- **Duplicate usernames in 03 and 05.** Signup looked for a user with the same username *and*
  password, so the same username could be registered twice.
- **Double responses in 04.** The auth middleware replied 401 for a missing token and then
  carried on. Unbuilt routes had empty handlers that never answered; they now reply 501.
- **A path that only worked on my laptop in 01.** The page is now served relative to the project.

## Running a project

Requires Node 20+.

```bash
cd 02-notes-app-with-auth
npm install
cp .env.example .env    # then fill in the values
npm start               # http://localhost:3000
```

- 03 and 05 need MongoDB, either local or a free Atlas cluster.
- 06 needs PostgreSQL. Create the table once with `psql "$DATABASE_URL" -f schema.sql`.
- Protected routes read the JWT from a `token` request header.

## Known limits

These were learning projects, and some things are deliberately left as they were:

- No automated tests.
- 01, 02 and 04 keep data in memory, so it is gone when the server restarts.
- Tokens never expire.
- Boards and issues in 04 are planned but not built.
- 06 has signup and signin but no todo routes yet.
