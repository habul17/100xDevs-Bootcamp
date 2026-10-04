# 03 · Todo App with MongoDB

A todo API with accounts and real storage. Users and todos are Mongoose models, and every
todo carries the `userId` of its owner, so the list and delete routes only ever touch your
own todos. Passwords are stored as bcrypt hashes.

```bash
npm install
cp .env.example .env    # set JWT_SECRET and MONGODB_URI
npm start               # http://localhost:3000
```

| Method | Path | Auth | Body | Does |
|---|---|---|---|---|
| POST | `/signup` | | `{ username, password }` | Creates an account, returns `{ user_id }` |
| POST | `/signin` | | `{ username, password }` | Returns `{ token }` |
| POST | `/todo` | token | `{ title, description }` | Creates a todo |
| GET | `/todo` | token | | Lists your todos |
| DELETE | `/todo/:todo_id` | token | | Deletes one of your todos |

Files: `models.js` (schemas and connection), `middleware.js` (JWT check), `index.js` (routes).
