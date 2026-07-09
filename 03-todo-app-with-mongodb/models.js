const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : string,
    password : string
})

const todoSchema = new mongoose.Schema({
    title : string,
    description : string,
    userId : mongoose.Types.ObjectId
})

const userModel = mongoose.Model("users", userSchema);
const todoModel = mongoose.Model("todos", todoSchema);

module.exports = {
    userModel,
    todoModel
}