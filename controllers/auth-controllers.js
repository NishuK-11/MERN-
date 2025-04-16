// // "action" is the description of what you want to do, while "dispatch" is the function that carries out that action

// in an express.js application, a "controller" refers to a part of your code that is 
// responsible for handling the application's logic. controllers are typically used to process incoming requests, interact with models(data sources)
// , and send responses back to clients. they help organize your application by separating 
// concerns and following the MVC(model-view-controller) design Pattern.
const User = require('../models/user-model');
const jwt  = require("jsonwebtoken");//This package creates JSON Web token.


const home = async(req,res) =>{
try{
    res.status(200).send("welcome to my world");
}catch(error){
    console.log("error found");
}
}

const register = async (req,res)=>{
    try{
        // console.log(req.body);
        const {username,email,phone,password} = req.body;

        const userExist = User
        // res.status(200).send('never cry for someone, they are not god');
        res.status(200).json({message:req.body});       
    }catch(error){
        res.status(500).json("internal server error");
    }
}

//Use following stuff to let users login and signup PLEASE: 
//The following function creates a json web token if we give it some info about the user that's unique: So we are using "user._id": see LINE57
const createToken = (id) => {
    //In the following line, the reason first parameter of the 'jwt.sign' function is '{_id:id}' is bcoz, later at some point when user makes a ...
    //...autorized request, we want to extract user's id from the given json web token. 
    //The second parameter is a .env variable from '.env' file. 
    //The Third parameter is the expiry date. After 3 days of user login, the json web token will expire. He/she must login again:
    return jwt.sign({_id:id},process.env.SEC,{expiresIn:"3d"});
};


//Login User : We are going to send the user given 'username' and 'password' we received to the STATIC LOGIN function inside user-model:
const loginUser = async (req,res) => {
    const {username,password} = req.body;
    try {
        const user  = await User.login(username,password);
        const token = createToken(user._id);
        res.status(200).json({user,token});
     } catch (error) {
        res.status(404).json({error:error.message});
     }
}

//Signup user : We are going to send the user given 'username','email','password', 'phone', 
const signupUser = async (req,res) => {
    const {username,email,phone,password,isAdmin} = req.body;//Doubt : 'isAdmin' is included into 'req.body'?
    try {
        const user  = await User.signup(username,email,phone,password,isAdmin);//Make sure to assign value to 'isAdmin'
        const token = createToken(user._id);
        res.status(200).json({user,token});
    } catch (error) {
        res.status(404).json({error:error.message});
    }
}


module.exports ={home,register};

