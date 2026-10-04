# 04 · Trello (in memory)

The backend for a small Trello. A user who creates an organisation becomes its admin, and
only the admin can add or remove members. Data is kept in arrays in memory, with counters
for IDs. Passwords are stored as bcrypt hashes.

```bash
npm install
cp .env.example .env    # set JWT_SECRET
npm start               # http://localhost:3000
```

A demo user `AB` with password `AB123` is created at startup and owns organisation `0`.

| Method | Path | Auth | Body / query | Does |
|---|---|---|---|---|
| POST | `/signup` | | `{ userName, password }` | Creates an account |
| POST | `/signin` | | `{ userName, password }` | Returns `{ token }` |
| POST | `/organization` | token | `{ title, description }` | Creates an organisation with you as admin |
| POST | `/add-members-to-organization` | admin | `{ organizationId, memberUserName }` | Adds a member |
| GET | `/organizations` | admin | `?organizationId=` | Shows the organisation and its members |
| DELETE | `/members` | admin | `{ organizationId, memberUserName }` | Removes a member |

Boards and issues are planned but not built. `POST`/`GET /boards`, `POST`/`GET`/`PUT /issues`
and `GET /members` reply `501 Not built yet`. Project 05 moves the organisation model to MongoDB.
