import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import crypto from "crypto"
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        select:false,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    role:{
        type:String,
        enum:["Admin","User"],
        default:"User"
    },
    accountVerified:{
        type:Boolean,
        default:false,
    },
    borrowedBooks:[
        {
            bookId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Borrow"
            },
            returned:{
                type:Boolean,
                default:false,
            },
            bookTitle:String,
            borrowedBooks:Date,
            dueDate:Date,
        }
    ],
    avtar:{
        public_id:String,
        url:String,
    },
    //Store the code and expiry time for email verification.
    verificationCode:Number,
    verificationCodeExpire:Date,
    // For password reset flow.
    resetPasswordToken:String,
    resetPasswordExpire:Date,
},
{
    timestamps:true,// Mongoose auto-adds createdAt and updatedAt fields.
}
)

userSchema.methods.generateVerificationCode = function(){
    function generateRandomFiveDigitNumber(){
        const firstDigit = Math.floor(Math.random()*9)+1;
        const remainingDigits = Math.floor(Math.random()*10000)
        .toString()
        .padStart(4,0);
        return parseInt(firstDigit+remainingDigits)
    }
    const verificationCode = generateRandomFiveDigitNumber();
    this.verificationCode = verificationCode;
    this.verificationCodeExpire = Date.now()+15*60*1000;//next 15 min mei expire hoga
    return verificationCode;
}

userSchema.methods.generateToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}
//hex data => 
userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex")

    this.resetPasswordExpire = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")
    this.resetPasswordExpire = Date.now()+15*60*1000;

    return resetToken;
}

export const User = mongoose.model("User",userSchema);