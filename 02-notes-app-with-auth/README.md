# 02 · Notes App with Auth

Project 01 with accounts. Users sign up and sign in, signin returns a JWT, and an auth
middleware reads it from the `token` header so each user only sees their own notes.
Passwords are stored as bcrypt hashes. Signup, signin and notes pages live in `frontend/`.

```bash
npm install
cp .env.example .env    # set JWT_SECRET
npm start               # http://localhost:3000
```

| Method | Path | Auth | Body | Does |
|---|---|---|---|---|
| POST | `/signup` | | `{ userName, password }` | Creates an account |
| POST | `/signin` | | `{ userName, password }` | Returns `{ token }` |
| POST | `/notes` | token | `{ note }` | Saves a note for you |
| GET | `/notes` | token | | Lists your notes |
| GET | `/`, `/signup`, `/signin` | | | Serves the pages |

Users and notes are kept in memory, so they are lost when the server restarts.
