import express from 'express'//core framework to build server
import {config} from "dotenv"//to load environment variable from .env file
import cookieParser from 'cookie-parser';//middleware to parse cookies attached to client requests
import cors from 'cors'//middleware to enable cross-origin resource sharing
import { connectDB } from './database/db.js';//connect to database
import authRouter from "./routes/authRouter.js"//express related handling authentication-related routes
import {errorMiddleware} from "./middlewares/errorMiddlewares.js"//custom middleware to handle errors globally

export const app = express();
// .env config is loaded with dotenv.config() specifying the path of the environment file.
config({path:"./config/config.env"})
//jo bhi middleware use krna hai usko wrap kro
app.use(
    cors({
    origin:[process.env.FRONTEND_URL,3000,2000],
    methods:['GET','POST','DELETE','PUT'],
    credentials:true,
    })
)
app.use(cookieParser())//Parses cookies so you can access them via req.cookies.
app.use(express.json())//Parses incoming JSON payloads.

// A form submits data like:
// name=John&age=30&city=New+York
// This middleware parses that string into a JavaScript object you can easily access via req.body:
// {
//   name: "John",
//   age: "30",
//   city: "New York"
// }
// If extended: false:

// The querystring library is used.

// Only simple key-value pairs are parsed.

// Nested objects or arrays are not supported.
//user[name]=John&user[age]=30&hobbies[]=reading&hobbies[]=coding
//{
//   user: {
//     name: "John",
//     age: "30"
//   },
//   hobbies: ["reading", "coding"]
// }

app.use(express.urlencoded({extended:true}))//
app.use("/api/v1/auth",authRouter)

connectDB()

app.use(errorMiddleware)

// POST /register --> Controller gets req.body (name, email, password)
//     |
//     V
// Validate input --> Check if user exists & attempts --> Hash password
//     |
//     V
// Create User document in MongoDB with accountVerified = false
//     |
//     V
// Call user.generateVerificationCode() to get code & expiry
//     |
//     V
// Save user in DB with verificationCode and verificationCodeExpired
//     |
//     V
// sendVerificationCode(code, email, res) --> Sends code email to user
//     |
//     V
// Responds with success message
