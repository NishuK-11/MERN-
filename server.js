require("dotenv").config();
const express = require("express");
const app = express();

const router = require("./router/auth-router");
const connectDb = require("./utils/db");
app.use(express.json());



app.use("/api/auth",router);
// app.get("/",(req,res)=>{
//     // res.send("status success")
//     res.status(200).send("status success");

// });


// app.get("/register",(req,res)=>{
//     // res.send("status success")
//     res.status(200).send("register here");

// });
// app.get("/login",(req,res)=>{
//     // res.send("status success")
//     res.status(200).send("login here");

// });


// app.use(express.json());//this line of code adds express middlewares that parses incoming requrst bodies with JSON  playloads. It's important to place this before any routes that need to handle JSON data in the request body. This middleware is responsible for parsing JSON data from requests and it should be applied at the beginning of your middleware stack to ensure it's available for all subsequent route handlers.
const port = 5000;
connectDb().then(()=>{
   
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`);
    });
})
