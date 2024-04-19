const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');  
        if (!token) {
            return res.status(401).json({ msg: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.ACCESS_TOKEN_SECRET);

        if (!decoded) {
            return res.status(401).json({ msg: "Unauthorized: Invalid token" });
        }
        const user = await Users.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ msg: "Unauthorized: User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
};

module.exports = auth;
