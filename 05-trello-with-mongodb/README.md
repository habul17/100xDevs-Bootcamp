# 05 · Trello with MongoDB

Project 04's organisations, now stored in MongoDB. Members are added with `$addToSet`, so
nobody can be added twice, and removed with `$pull`. Admins and members can view an
organisation, but only the admin can change who is in it. Passwords are stored as bcrypt hashes.

```bash
npm install
cp .env.example .env    # set JWT_SECRET and MONGODB_URI
npm start               # http://localhost:3000
```

| Method | Path | Auth | Body / query | Does |
|---|---|---|---|---|
| POST | `/signup` | | `{ username, password }` | Creates an account |
| POST | `/signin` | | `{ username, password }` | Returns `{ userId, token }` |
| POST | `/organization` | token | `{ title, description }` | Creates an organisation with you as admin |
| POST | `/add-members-to-organization` | admin | `{ organizationId, memberUsername }` | Adds a member |
| GET | `/organization` | admin or member | `?organizationId=` | Shows the organisation |
| DELETE | `/member` | admin | `{ organizationId, memberUsername }` | Removes a member |

Files: `models.js` (schemas and connection), `middleware.js` (JWT check), `index.js` (routes).
