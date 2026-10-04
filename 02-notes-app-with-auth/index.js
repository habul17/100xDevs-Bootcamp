const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { authMiddleware } = require('./middleware');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());

const USERS = [];
const NOTES = [];


// POST - signup

app.post("/signup", async (req, res) => {

    const userName = req.body.userName;
    const password = req.body.password;

    if (!userName || !password) {
        res.status(400).json({
            message: "Username and password are required"
        })
        return;
    }

    const userExist = USERS.find(user => user.userName == userName);

    if (userExist) {
        res.status(403).json({
            message: "Username Already Exist"
        })
        return;
    }

    // Only the bcrypt hash is kept, never the password itself
    const hashedPassword = await bcrypt.hash(password, 10);

    USERS.push({
        userName,
        password: hashedPassword
    })

    res.json({
        message: "Sign Up Successfull"
    })
})

// POST - signin

app.post("/signin", async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    const userExist = USERS.find(user => user.userName == userName);
    const passwordMatches = userExist && password && await bcrypt.compare(password, userExist.password);

    if (!passwordMatches) {
        res.status(403).json({
            message: "Invalid Credentials"
        })
        return;
    }

    const token = jwt.sign({ userName }, process.env.JWT_SECRET);

    res.json({
        token
    })

})


// POST - Create Note

app.post("/notes", authMiddleware, (req, res) => {

    const note = req.body.note;
    const userName = req.userName;

    NOTES.push({
        note,
        userName
    })

    res.json({
        message: "Note Created Successfully"
    })
})


// GET - Get All Notes

app.get("/notes", authMiddleware, (req, res) => {

    const userName = req.userName;

    const userNotes = NOTES.filter(notes => notes.userName === userName);

    res.json({
        notes: userNotes
    })

})

// GET - Serve Signup Page

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'signup.html'));
})


// GET - Serve Signin Page

app.get("/signin", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'signin.html'));
})


// GET - Serve FE

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
})

app.listen(3000);