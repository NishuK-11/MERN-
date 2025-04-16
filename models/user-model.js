// schema: defines the structure of the documents within a collection. 
// it specifies the field, their types and any additional constraints or validations. 

const mongoose = require("mongoose");
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

// model: acts as a higher-level abstraction that interact with the database based on the defined Schema. It represents a collection and provides an interface 
// for querying,creating,updating and deleting documnets in that collection. Models are created from schemas and enable you to work with MongoDB data in more structured manner in your application. 

const User = new mongoose.model("User",userSchema);
module.exports = User;