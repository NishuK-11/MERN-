const cookieParser = require('cookie-parser')
const express = require("express");
const app = express();
const path = require('path')
const userModel = require("./models/user");

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("hello nishu")
})
app.post('/create',async (req,res)=>{
    let {username,email,password,age}= req.body;
    let createUser =  await userModel.create({
        username,
        email,
        password,
        age
    })
    res.send(createUser)
})
app.listen(3000);