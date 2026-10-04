const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { authMiddleware } = require('./middleware')
const { userModel, todoModel } = require('./models')
require('dotenv').config();

const app = express();

app.use(express.json());


app.post("/signup", async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {

        res.status(400).json({
            message: "Username and password are required"
        })
        return;
    }

    const userExist = await userModel.findOne({
        username
    })

    if (userExist) {

        res.status(403).json({
            message: "User Already Exist"
        })
        return;
    }

    // Only the bcrypt hash is stored, never the password itself
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        username,
        password: hashedPassword
    })

    res.json({
        user_id: newUser._id,
        message: "Sign Up Successfull"
    })

})


app.post("/signin", async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const userExist = await userModel.findOne({
        username
    })

    const passwordMatches = userExist && password && await bcrypt.compare(password, userExist.password);

    if (!passwordMatches) {

        res.status(403).json({
            message: "Invalid Credentials"
        })
        return;
    }

    const token = jwt.sign({
        user_id: userExist._id
    }, process.env.JWT_SECRET)


    res.json({
        message: "Sign In Successful",
        token
    })

})


app.post("/todo", authMiddleware, async (req, res) => {

    const user_id = req.user_id;
    const title = req.body.title;
    const description = req.body.description;

    await todoModel.create({
        title,
        description,
        userId: user_id
    })

    res.json({
        message: "Todo Created Successfully"
    })


})

app.get("/todo", authMiddleware, async (req, res) => {

    const user_id = req.user_id;

    const userTodo = await todoModel.find({ userId: user_id });

    res.json({
        todos: userTodo
    })

})


app.delete("/todo/:todo_id", authMiddleware, async(req, res) => {

    const user_id = req.user_id;
    const todo_id = req.params.todo_id;

    await todoModel.deleteOne({
        _id: todo_id,
        userId: user_id
    })


    res.json({
        user_id,
        todo_id,
        message: "Todo Deleted"
    })


})


app.listen(3000);