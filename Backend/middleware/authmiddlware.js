const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticationJwt = (req,res,next) =>{
    const token = req.cookies.token || req.header('Authorization')?.split(' ')[1];

    if(!token){
        return res.status(403).json({Message : "Access denied"})
    }

    try {
        const decoded = jwt.verify(token ,process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
}

const isAdmin = (req,res,next) =>{
    if(req.user.role !== 'admin'){
        return res.status(403).json({message : "Access denied, admins rights  reqiured"})
    }
    next()
}

module.exports = {authenticationJwt,isAdmin}