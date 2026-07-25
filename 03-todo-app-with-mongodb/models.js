const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)

const userSchema = new mongoose.Schema({
    username : String,
    password : String
})

const todoSchema = new mongoose.Schema({
    title : String,
    description : String,
    userId : mongoose.Schema.Types.ObjectId
})

const userModel = mongoose.model("users", userSchema);
const todoModel = mongoose.model("todos", todoSchema);

module.exports = {
    userModel,
    todoModel
}