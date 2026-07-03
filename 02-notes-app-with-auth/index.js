const express = require('express');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('./middleware');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());

const USERS = [];
const NOTES = [];


// POST - signup

app.post("/signup", (req, res) => {

    const userName = req.body.userName;
    const password = req.body.password;

    const userExist = USERS.find(user => user.userName == userName);

    if (userExist) {
        res.status(403).json({
            message: "Username Already Exist"
        })
        return;
    }

    USERS.push({
        userName,
        password
    })

    res.json({
        message: "Sign Up Successfull"
    })
})

// POST - signin

app.post("/signin", (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    const userExist = USERS.find(user => user.userName == userName && user.password == password);

    if (!userExist) {
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
    userName = req.userName;

    NOTES.push({
        note,
        userName
    })

    res.json({
        message: "Note Created Successfully"
    })
})


// GET - Get All Notes

app.get("/notes", (req, res) => {

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