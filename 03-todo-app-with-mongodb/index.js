const express = require('express');
const jwt = require('jsonwebtoken');
const {authMiddleware} = require('./middleware')
const {userModel, todoModel} = require("./models")
require('dotenv').config();

const app = express();

app.use(express.json());


app.post("/signup", (req, res) => {

})

app.post("/signin", (req, res) => {

})

app.post("/todo", authMiddleware, (req, res) => {

})

app.get("/todo", authMiddleware, (req, res) => {

})

app.listen(3000);