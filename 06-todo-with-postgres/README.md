# 06 · Todo with PostgreSQL

Accounts on PostgreSQL, written in plain SQL with the `pg` driver instead of an ORM. Every
query uses `$1`, `$2` placeholders, so user input is never pasted into the SQL. Passwords are
stored as bcrypt hashes, and the `UNIQUE` constraint on `email` is turned into a `409` when
someone signs up twice with the same email.

```bash
npm install
cp .env.example .env               # set JWT_SECRET and DATABASE_URL
psql "$DATABASE_URL" -f schema.sql # once, creates the users table
npm start                          # http://localhost:3000
```

| Method | Path | Body | Does |
|---|---|---|---|
| POST | `/signup` | `{ username, email, password }` | Creates an account, returns `{ id }` |
| POST | `/signin` | `{ email, password }` | Returns `{ token }` |

Signup and signin are done. The todo routes are not built yet.
