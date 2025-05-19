import  express from "express";
import {forgotPassword, getUser, login, logout, register, resetPassword, updatePassword, verifyOTP} from "../controllers/authController.js"//handle registration logic
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();
//When a POST request is made to /register, the register controller function will handle the request.
router.post("/register",register);
router.post("/verify-otp",verifyOTP);
router.post("/login",login);
router.get("/logout",isAuthenticated,logout)
router.get("/me",isAuthenticated,getUser)
router.post("/password/forgot",forgotPassword)
router.put("/password/reset/:token",resetPassword)
router.put("/password/update",isAuthenticated,updatePassword)

export default router;

// File	Role	Connected to
// routes/authRouter.js	Defines API endpoints (e.g., /register)	Calls controller functions
// controllers/authController.js	Contains functions like register	Uses Mongoose models; wrapped in catchAsyncErrors
// database/db.js	Connects to MongoDB	Used in main app file
// middlewares/errorMiddlewares.js	Contains catchAsyncErrors, errorMiddleware, ErrorHandler	Imported in main app; errorMiddleware used as global error handler
// app.js (or main server file)	Sets up express app, middleware, routes, database connection	Imports routes, middlewares, connects DB

