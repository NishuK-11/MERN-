import { generateVerificationOtpEmailTemplate } from "./emailTemplate.js";
import { sendEmail } from "./sendEmail.js";


export async function sendVerificationCode(verificationCode,email,res){
    try{
        const message = generateVerificationOtpEmailTemplate(verificationCode);
        sendEmail({
            email,
            subject:"Verification Code (BookWorm Library Management System)",
            message,
        })
        res.status(200).json({
            success:true,
            message:"verification code sent successfull"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"verification code failed to send"
        })
    }
}


// Step 1: You generate the email HTML content with the OTP inside by calling generateVerificationOtpEmailTemplate(verificationCode).

// Step 2: You send the email by calling sendEmail() with recipient, subject, and message.

// Step 3: If the email sends successfully, respond with HTTP 200 and a success message to the client (like your frontend or Postman).

// Step 4: If any error occurs (like SMTP server down, invalid email), catch it and respond with HTTP 500 and failure message.