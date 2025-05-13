// schema: defines the structure of the documents within a collection. 
// it specifies the field, their types and any additional constraints or validations. 
const bcrypt    = require('bcrypt');
const validator = require('validator');
const mongoose  = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
})

//A Static Method to Signup a user :
userSchema.statics.signup = async function(username,email,phone,password,isAdmin) {
    //See if all the fields are filled : 
    if (!username || !email || !password || !phone) {
        throw Error("All fields must be filled!");
    }
    //See if the password is strong enough : This uses 'validator'
    if (!validator.isStrongPassword(pwd)){
        throw Error("Password not strong enough!");
    }
    //See if the user with the given username exists already: Cuz a user can't signup twice:
    const exists = await this.findOne({username:username});
    //If a user exists : If a user exists i have to tell "Username already exists":
    if (exists) {
        throw Error("Username already exists!");
    };
    //Create a salt to add to the password : 
    const salt = await bcrypt.genSalt(10);
    //Create a hash using the given password and the salt:
    const hash = await bcrypt.hash(password,salt);
    //Since saving the plain password strings are not secure, we are going to save the hashed password:
    const user = await this.create({username,email,phone,password:hash,isAdmin}); //Make sure to assign a value to 'isAdmin'
    //Return that new user:
    return user;
} 

//A Static Method to Login a user : 
userSchema.statics.login = async function(username,password) {
    //See if all the fields are filled : 
    if (!username || !password) {
        throw Error("All fields must be filled!");
    }
    //See if a user exists with the given username:
    const user = await this.findOne({username});
    if (!user){
        throw Error("Incorrect Username!");
    };
    //This following line compares the given password with already saved 'hashed password' to see if the given password is correct:
    const match = await bcrypt.compare(password,user.password);
    if (!match) {
        throw Error("Incorrect Password!")
    }
    return user;
}


// model: acts as a higher-level abstraction that interact with the database based on the defined Schema. It represents a collection and provides an interface 
// for querying,creating,updating and deleting documnets in that collection. Models are created from schemas and enable you to work with MongoDB data in more structured manner in your application. 

const User = new mongoose.model("User",userSchema);
module.exports = User;