const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
        const realToken = token.split(' ')[1];

        if(!token) return res.status(400).json({msg: "Invalid Authentication."})


        const decoded = jwt.verify(realToken, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) {
            return res.status(401).json({ msg: "Unauthorized: Invalid token" });
        }
        const user = await Users.findById({_id:decoded.id});
        if (!user) {
            return res.status(401).json({ msg: "Unauthorized: User not found" });
        }

        req.user = user;
        next();
    } catch (err) { 
        
        return res.status(500).json({ msg: "Server Error" });
    }
};

module.exports = auth;
