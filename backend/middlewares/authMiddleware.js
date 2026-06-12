import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

const authincateUser = asyncHandler(async (req,res,next)=>{
    //read jwt from 'jwt' cookie

    const token = req.cookies.jwt;

    if(token){
        try {
           const decoded = jwt.verify(token , process.env.JWT_SECRET); 
           req.user = await User.findById(decoded.userId).select('-password');
           next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }else{
        res.status(401);
        throw new Error("No token");
    }
});     

const authorizeAdmin = (req , res , next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        req.status(401).send("Not Authorized as Admin.");
    }
}

export {authincateUser , authorizeAdmin};