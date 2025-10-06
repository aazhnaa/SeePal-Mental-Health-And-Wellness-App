import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

export const verifyAdmin = async(req, res, next) =>{
    console.log("verifying user's role");
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"Unauthorized - no token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message:"Unauthorized - no token provided"});
        }
        const user = await User.findById(decoded.userId).select("-password");
        console.log("user ", user.username);
        if(user.role !== 'admin'){
            return res.status(403).json({message: 'Forbidden : Admins only'});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log('error in verifyAdmin middleware : ', error);
        res.status(401).json({ message: 'Invalid token' });
    }
}