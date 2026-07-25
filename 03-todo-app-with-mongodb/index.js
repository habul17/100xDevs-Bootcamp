const express = require('express');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('./middleware')
const { userModel, todoModel } = require("./models")
require('dotenv').config();

const app = express();

app.use(express.json());

let USER_ID = 1;
let TODO_ID = 1;


const USERS = [];
let TODOS = [];


app.post("/signup", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const userExist = USERS.find(u => u.username === username);

    if (userExist) {

        res.status(403).json({
            message: "User Already Exist"
        })
        return;
    }

    USERS.push({
        user_id: USER_ID++,
        username,
        password
    })

    res.json({
        user_id: USER_ID - 1,
        message: "Sign Up Successfull"
    })

})


app.post("/signin", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const userExist = USERS.find(u => u.username === username && u.password === password);

    if (!userExist) {

        res.status(403).json({
            message: "Invalid Credentials"
        })
        return;
    }

    const token = jwt.sign({
        user_id: userExist.user_id
    }, process.env.JWT_SECRET)


    res.json({
        message : "Sign In Successful",
        token
    })

})


app.post("/todo", authMiddleware, (req, res) => {

    const user_id = req.user_id;
    const title = req.body.title;
    const description = req.body.description;


    TODOS.push({
        todo_id : TODO_ID++,
        title,
        description,
        user_id
    })

    res.json({
        message : "Todo Created Successfully"
    })


})

app.get("/todo", authMiddleware, (req, res) => {

    const user_id = req.user_id;

    const userTodo = TODOS.filter(u => u.user_id === user_id);

    res.json({
        todos : userTodo
    })

})


app.delete("/todo/:todo_id", authMiddleware, (req, res) => {

    const user_id = req.user_id;
    const todo_id = parseInt(req.params.todo_id);

    TODOS = TODOS.filter(t => !(t.todo_id === todo_id && t.user_id === user_id));


    res.json({
        user_id,
        todo_id,
        message : "Todo Deleted"
    })


})


app.listen(3000);