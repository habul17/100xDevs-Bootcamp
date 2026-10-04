# 01 · Notes App (basic)

My first Express API. Notes are kept in an array in memory, and `frontend/index.html` is a
plain HTML page that lists and adds notes through the API with axios.

```bash
npm install
npm start    # http://localhost:3000
```

| Method | Path | Body | Does |
|---|---|---|---|
| GET | `/` | | Serves the HTML page |
| POST | `/notes` | `{ note }` | Saves a note |
| GET | `/notes` | | Lists every note |

Notes are lost when the server restarts. Project 02 adds users and auth on top of this.
