const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req, res, next) {

    const token = req.headers['token'];

    const decoded = jwt.verify(token, process.JWT_SECRET);
    
    if (decoded.userId) {
        req.userId = decoded.userId;
        next();
    } else {
        res.status(403).json({
            message: "Invalid Token or not found"
        })
    }
}

module.exports = {
    authMiddleware
}