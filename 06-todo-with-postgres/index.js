const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config({ quiet: true });

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

const app = express();

app.use(express.json());

// Postgres error code for a UNIQUE constraint violation
const UNIQUE_VIOLATION = '23505';


app.post("/signup", async (req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!username || !email || !password) {
        res.status(400).json({
            message: "Username, email and password are required"
        })
        return;
    }

    // Only the bcrypt hash is stored, never the password itself
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // $1, $2, $3 are sent separately from the SQL, so user input can never change the query
        const response = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;',
            [username, email, hashedPassword]
        );

        res.json({
            message: "Signup Successfull",
            id: response.rows[0].id
        })
    } catch (err) {
        if (err.code === UNIQUE_VIOLATION) {
            res.status(409).json({
                message: "Email Already Registered"
            })
            return;
        }
        throw err;
    }

})


app.post("/signin", async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const response = await pool.query('SELECT id, password FROM users WHERE email = $1', [email]);

    const userExist = response.rows[0];
    const passwordMatches = userExist && password && await bcrypt.compare(password, userExist.password);

    if (!passwordMatches) {
        res.status(403).json({
            message: "Invalid Credentials"
        })
        return;
    }

    const token = jwt.sign({ userId: userExist.id }, process.env.JWT_SECRET);

    res.json({
        message : "Sign In Successfull",
        token
    })

})



app.listen(3000);
