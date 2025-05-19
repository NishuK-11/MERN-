import { catchAsyncErrors} from "../middlewares/catchAsyncError.js";// handle async errors without repetitive try-catch.

import ErrorHandler from "../middlewares/errorMiddlewares.js";//custom error class for consistent error messages.
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto"// is used for generating random secure data (e.g., tokens).
import { sendVerificationCode } from "../utils/sendVerificationCode.js";// is your utility to send an email with a verification code.
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateForgotPasswordEmailTemplate } from "../utils/emailTemplate.js";

export const register = catchAsyncErrors(async(req,res,next)=>{
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return next(new ErrorHandler("Please enter all fields",400));
        }
        const isRegistered = await User.findOne({email,accountVerified:true});
        if(isRegistered){
            return next(new ErrorHandler("User already exists",400));
        }
        const registerationAttemptsByUser = await User.find({
            email,
            accountVerified:false
        })
        if(registerationAttemptsByUser.length>=5){
            return next(
                new ErrorHandler(
                    "You have exceeded the number of registration attempts.Please contact support.",400
                )
            )
        }
        if(password.length <8 || password.length>16){
            return next(
                new ErrorHandler("Password must be between 8 to 16 characters",400)
            )
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email ,
            password:hashedPassword,
        })
        const verificationCode = await user.generateVerificationCode();
        await user.save();
        sendVerificationCode(verificationCode,email,res);
    }catch (error){
        next(error);
    }
});

export const verifyOTP = catchAsyncErrors(async (req,res,next)=>{
    const {email,otp} = req.body;
    if(!email || !otp){
        return next(new ErrorHandler("Email or otp is missing",400));
    }
    try{
        //maan lo paanch minute ke andar andar user ne char baar verify kar diya to hm latest wale ko use karenge (uski data)
        const userAllEntries = await User.find({
            email,
            accountVerified:false,
        }).sort({createdAt:-1})//descending order

        if(!userAllEntries){
            return next(new ErrorHandler("User not found:",400));
        }
        let user;
        if(userAllEntries.length>1){
            user = user.userAllEntries[0];//latest wali entry ko user mei store kr diya
            await User.deleteMany({
                _id:{$ne:user._id},//$ne user ki id(._id) aur ye id(user._id) agr match kr jaye to delete mt krna 
                email,
                accountVerified:false,
            })
        }else{
            user = userAllEntries[0];
        }
        //jo otp bhejenge wo string format mei hoga baad mei number me le aayenge aur verificationCode to hoga hi number mei
        if(user.verificationCode!==Number(otp)){
            return next(new ErrorHandler("Invalid OTP:",500))
        }

        const currentTime = Date.now();
        const verificationCodeExpire = new Date(
            user.verificationCodeExpire
            ).getTime()

            if(currentTime>verificationCodeExpire){
                return next(new ErrorHandler("OTP EXPIRED",400))
            }

            user.accountVerified = true;
            user.verificationCode = null;
            user.verificationCodeExpire = null;
            await user.save({validateModifyOnly:true})


            sendToken(user,200,"Account verified:",res)
    }catch(error){
        return next(new ErrorHandler("Internal server error",500));
    }
})

export const login = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please enter all fields",400));
    }
    //hmne password ko select false kr rakha hai to hm password get nhi kr payenge bhale hi jis bhi format mei ho
    // const user = await User.findOne({email,accountVerified:true}).select("+password");
    const user = await User.findOne({ email, accountVerified: true }).select("+password +email");

    console.log("User fetched from DB:", user);

    if(!user){
        return next(new ErrorHandler("Invalid email or password",400))
    }
    console.log("Entered password:", password);
    console.log("Hashed password in DB:", user.password);

    const isPasswordMatched = await bcrypt.compare(password,user.password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",400))
    }
    sendToken(user,200,"User login successfully",res);
})

export const logout = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        httpOnly:true,
    })
    .json({
        success:true,
        message:"Logged out successfully."
    })
})

export const getUser = catchAsyncErrors(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user,
    })
})

export const forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    if(!req.body.email){
        return next(new ErrorHandler("Email is required",400))
    }
    // const user = await User.findOne({
    //     email:req.body.email,
    //     accountVerified:true,
    // });
     const user = await User.findOne({
        email:req.body.email,
        accountVerified:true,
    }).select("+email");
    if(!user){
        return next(new ErrorHandler("Invalid email:",400));
    }
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = generateForgotPasswordEmailTemplate(resetPasswordUrl);
    console.log("working till here");
    console.log(user.email);
    console.log(message);
    // try{
    //     await sendEmail({
    //         email:user.email,
    //         subject:"Bookworm Library Management System Password Recovery",
    //         message:`Email sent to ${user.email} successfully`,
    //     })
    // }
    try {
        if (!user.email) {
    console.error("EMAIL FIELD MISSING FROM USER OBJECT");
    return next(new ErrorHandler("Email field missing from DB", 500));
}

    await sendEmail({
        email: user.email,
        subject: "Bookworm Library Management System Password Recovery",
        // message: message, // This is the actual HTML email content
        message,
    });
    
    res.status(200).json({
        success: true,
        message: `Password reset email sent to ${user.email} successfully.`,
    });
}
    catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500))
    }
})

export const resetPassword = catchAsyncErrors(async(req,res,next)=>{
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    });
    if(!user){
        return next(
            new ErrorHandler(
                "Reset password is invalid or has been expired",400
            )
        )
    }
    if(req.body.password !==req.body.confirmPassword){
        return next(new ErrorHandler("Password and confirm password doesnot match",400))
    }
    if(req.body.password.length <8 ||
        req.body.password.length>16 ||
        req.body.confirmPassword.length <8 ||
        req.body.confirmPassword.length>16 
        
    ){
        return next(
            new ErrorHandler("Password and confirm password do not match",400)
        )
    }
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,"Password reset successfully",res);
})

export const updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user._id).select("+password");
    const {currentPassword,newPassword,confirmPassword} = req.body;
    if(!currentPassword || !newPassword || !confirmPassword) {
        return next(new ErrorHandler("Please enter all fields",400))
    }
    const isPasswordMatched = await bcrypt.compare(currentPassword,user.password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Current password is incorrect",400));

    }
    if(newPassword.length <8 ||
        newPassword.length>16 ||
        confirmNewPassword.length <8 ||
        confirmNewPassword.length>16        
    ){
        return next(
            new ErrorHandler("Password and confirm password do not match",400)
        )
    }
    if(newPassword !== confirmNewPassword){
        return next(
            new ErrorHandler(
                "New password and  confirm new password do not match."
            )
        )
    }

    const hashedPassword = await bcrypt.hash(newPassword,10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
        success:true,
        message:"password updated"
    })

})