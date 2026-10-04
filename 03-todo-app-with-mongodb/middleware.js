const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req, res, next) {

    const token = req.headers['token'];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.user_id) {
            req.user_id = decoded.user_id;
            next();
        } else {
            res.status(403).json({
                message: "Invalid Token or not found"
            })
        }
    } catch (err) {
        res.status(403).json({
            message: "Invalid Token or not found"
        })
    }
}

module.exports = {
    authMiddleware
}