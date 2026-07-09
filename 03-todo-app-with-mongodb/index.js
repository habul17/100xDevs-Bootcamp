const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(express.json());


app.post("/signup", (req, res) => {

})

app.post("/signin", (req, res) => {

})

app.post("/todo", (req, res) => {

})

app.get("/todo", (req, res) => {

})

app.listen(3000);