// cookie-parser -> token to geberate ho jayega, login successfully bhi ho jayega pr aap login nhi ho paoge, uske liye cookie-parser ki jaroorat padti hai
//cloudinary -> images video ko cloud pr store karne ke liye
//cors -> multiple server ko connect karne ke liye
//dotenv -> variable (secret ko store karne k liye)
//express -> backend framework
//express-fileupload -> file ko upload karne ke liye(path wgrh define krta hai)
//node-cron -> automation and scheduling purpose ke liye
//nodemailer -> reset password 
import {app} from "./app.js"
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})



// User (Client) 
//     |
//     |  POST /register  (name, email, password)
//     V
// Auth Controller: register()  [authController.js]
//     |
//     |-- Validate input fields (name, email, password)
//     |-- Check if user with email & accountVerified=true exists
//     |-- Check if registration attempts >= 5 with accountVerified=false
//     |-- Validate password length
//     |-- Hash password (bcrypt)
//     |-- Create user in MongoDB (User model)
//     |-- Generate verification code (userSchema method)
//     |-- Save user with verification code and expiry
//     |-- Call sendVerificationCode()
//            |
//            V
// sendVerificationCode(verificationCode, email, res) [sendVerificationCode.js]
//     |
//     |-- Generate email HTML template with OTP code
//     |-- Call sendEmail({email, subject, message})
//            |
//            V
// sendEmail({email, subject, message}) [sendEmail.js]
//     |
//     |-- Configure nodemailer transporter (SMTP details from .env)
//     |-- Prepare mail options (from, to, subject, html)
//     |-- Send mail via transporter.sendMail()
//     |-- Resolve promise (success or failure)
//     |
//     V
// Response sent to user:
//     {
//       success: true,
//       message: "verification code sent successfully"
//     }
