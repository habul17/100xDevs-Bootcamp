const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

express.use(express.json());

const app = express();

const USERS = [];
const NOTES = [];


// POST - signup

app.post("/signup", (req, res) => {

    const userName = req.body.userName;
    const password = req.body.password;

    const userExist = USERS.find(user => user.userName == userName);

    if(userExist) {
        res.status(403).json({
            message : "Username Already Exist"
        })
        return;
    }

    USERS.push({
        userName,
        password
    })
} )

// POST - signin

app.post("/signin", (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    const userExist = USERS.find(user => user.userName == userName && user.password == password);

    if(!userExist) {
        res.status(403).json({
            message : "Username Doesn't Exist"
        })
        return;
    }

    const token = jwt.sign({userName}, process.env.JWT_SECRET);

    res.json({
        token
    })

})

app.listen(3000);