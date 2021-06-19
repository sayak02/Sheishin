const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require("../models/user");
const expressJwt = require('express-jwt');


exports.signup = async (req,res) => {
    const userExists = await User.findOne({email : req.body.email})
    if(userExists) return res.status(403).json({
        error : "Email is already taken."
    })
    const user = await new User(req.body)
    await user.save();
    res.status(200).json({
        message : "New User Created.Please SignIn",
        user : user
    })
}

exports.signin = (req,res) => {
    //find the user based on email
    const {email,password} = req.body;
    User.findOne({email},(err,user)=>{
        //if error or no user
        if(err || !user){
            return res.status(401).json({
                error : "User does not exist"
            })
        }
        //User found? Check email and password
        //check with Authenticate function in User model
        if(!user.authenticate(password)){
            return res.status(401).json({
                error : "Email and password do not match"
            })
        }
        //generate a token with user id and secret
        const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET); //generate a cookie
    
        //persist the token as 't' in cookie with expiry date
        res.cookie("t",token, {expire : new Date() + 9999})

        //return response with user and token to frontend client
        const {_id, name, email} = user;
        return res.json({token :token , user : {_id, email, name}})
    });
}

exports.signout = (req,res) => {
    res.clearCookie("t");
    return res.json({message : "Successfully signed out"});
}

exports.requireSignin = expressJwt({
    //if token valid? express jwt appends the verified users id
    // in an auth key to the request object
    secret : process.env.JWT_SECRET,
    algorithms: ['sha1', 'RS256', 'HS256'],
    userProperty : "auth"
});