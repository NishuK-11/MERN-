// const express = require('express')
 // "dev":"node server.js"-> isko likh lene se terminal pe bs npm run dev likhna padta hai
import mongoose from 'mongoose';
 import express from 'express';
import dotenv from 'dotenv';
import { connectDB} from './config/db.js';
import ProductRoutes from "./routes/product.route.js"
// import Product from './models/product.model.js';
dotenv.config(); // Load env variables

const app = express();
const PORT = process.env.PORT ||4000

app.use(express.json());//allows us to accept JSON data in req.body
// console.log(process.env.MONGO_URI); // Should print the actual Mongo URI

app.use("/api/products",ProductRoutes)
app.listen(PORT, () => {
    connectDB();
    console.log("server started at http://localhost:"+PORT);
});

// //4ehdwcE3qtZSzoQG
// | Code | Meaning               | When to Use                                     |
// | ---- | --------------------- | ----------------------------------------------- |
// | 200  | OK                    | Everything worked fine                          |
// | 201  | Created               | Resource created successfully                   |
// | 400  | Bad Request           | User did something wrong (e.g., missing fields) |
// | 401  | Unauthorized          | No login / token                                |
// | 403  | Forbidden             | Access denied                                   |
// | 404  | Not Found             | Resource doesn't exist                          |
// | 500  | Internal Server Error | Something broke in the server code  