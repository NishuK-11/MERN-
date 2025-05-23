const User = require("../models/user")
require("dotenv").config();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSignUp = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const hashPwd = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashPwd
  });

  let token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.SECRET_KEY);

  return res.status(200).json({
    message: "User created successfully",
    token,
    user: newUser
  });
};

const userLogin = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({message:"email and password are required"})
    }
    let user = await User.findOne({email})
    if(user && await bcrypt.compare(password,user.password)){
        let token = jwt.sign({email,id:user._id},process.env.SECRET_KEY)
        return res.status(200).json({token,user:newUser})
    }
    else{
        return res.status(400).json({message:"Invalid credentials"})
    }
}
const getUser = async(req,res)=>{
    const user = await User.findById(req.params.id)
    res.json({email:user.email})
}
module.exports = {userLogin,userSignUp,getUser}