import mongoose from "mongoose";
export const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"MERN_STACK_DATABASE_MANAGEMENT_SYSTEM"
    }).then(()=>{
        console.log('database connected successfully');
    }).catch("Error connecting to database")
}