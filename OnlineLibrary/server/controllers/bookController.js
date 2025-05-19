import { catchAsyncErrors } from "../middlewares/catchAsyncError";
import {Book} from "../models/bookModel.js"
import {User} from "../models/userModel.js"
import ErrorHnadler from "../middlewares/errorMiddlewares.js"
export const addBook = catchAsyncErrors(async(req,res,next)=>{

})
export const deleteBook = catchAsyncErrors(async(req,res,next)=>{
    
})
export const getAllBooks = catchAsyncErrors(async(req,res,next)=>{
    
})