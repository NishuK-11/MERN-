const express = require('express')
const app = express()
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000
const connectDb = require("./config/connectionDb");
// app.get('/', (req, res) => res.send('Hello World!'))
// app.get('/get',(req,res)=>{
//     res.json({message:"hello"});
// })
connectDb();
app.use(express.json());
const recipeRoutes = require('./routes/recipe');
// const router2 = require('./routes/route2');
// app.use('/wish',router2);
app.use('/recipe',recipeRoutes);
app.listen(port, () => console.log(`Recipe app listening on port ${port}!`)) 