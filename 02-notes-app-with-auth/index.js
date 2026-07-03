const express = require('express');
const jwt = require('jsonwebtoken');

express.use(express.json());

const app = express();

const USERS = [];
const NOTES = [];



app.listen(3000);