const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config({ quiet: true });

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

const app = express();

app.use(express.json());


app.post("/signup", async (req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const response = await pool.query(`INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}') RETURNING id;`);

    res.json({
        message: "Signup Successfull",
        id: response.rows[0].id
    })

})



app.listen(3000);