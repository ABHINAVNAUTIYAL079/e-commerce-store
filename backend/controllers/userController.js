import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
    
    const { username, email, password } = req.body;

    if(!username || !password || !email){
        throw new Error("Please add all fields");
    }

    const userExist = await User.findOne({email});
    if(userExist){
        return res.status(400).json({message: "User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        username,
        email,
        password: hashedPassword,
    })

    try {
        await user.save();
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        res.status(400)
        throw new Error("Invalid User Data")
    }
});

const loginUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Please add all fields"});
    }

    const userExist = await User.findOne({email});
    if(!userExist){
        return res.status(401).json({message: "Invalid Email or Password"});
    }

    const isMatch = await bcrypt.compare(password, userExist.password);
    if(!isMatch){
        return res.status(401).json({message: "Invalid Email or Password"});
    }

    generateToken(res, userExist._id);
    res.status(200).json({
        _id: userExist._id,
        username: userExist.username,
        email: userExist.email,
    });
});

const logoutCurrentUser = asyncHandler(async (req , res) =>{
    res.cookie('jwt' , '' , {
        httpOnly : true,
        expires : new Date(0),
    })

    res.status(200).json({message: "Logged out successfully"});
});

const getAllUsers = asyncHandler(async(req , res) =>{
    const users = await User.find({});
    res.status(200).json(users);
});

const getCurrentUserProfile = asyncHandler(async(req , res) =>{
    const user = await User.findById(req.user._id);
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
    });
});

const updateProfile = asyncHandler(async(req , res) =>{
    const user = await User.findById(req.user._id);
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashedPassword;
    }
    await user.save();
    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
    });
});

export { createUser, loginUser, logoutCurrentUser,getAllUsers,getCurrentUserProfile,updateProfile };