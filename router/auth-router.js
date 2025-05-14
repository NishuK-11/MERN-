//express.Router
//in express.js , express.router() is a mini express application without all the server configurations but with the ability to define routes, middlewares and even have its own set of route handlers. it allows you to modilarize your routes and middlewares to keep your code organized and maintainable.

//https://expressjs.com/en/guide/routing.html
//use the express router class to create modular , mountable route handlers. 
//a router instance is a complete middleware and routing system. it is often referred to as a "mini-app".


// const express = require('express');
// const router = express.Router();
// const home = require("../controllers/auth-controllers");
// // router.get('/',(req,res)=>{
// //     res.status(200).send("welcome to world best mern stack course");

// // })

// router.route("/").get((req,res)=>{
//     res.status(200).send("hii everyone dont waste your time ever");

// })

// router.route('/register').get((req,res)=>{
//     res.status(200).send("welcome to registration page");
// });
// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const {home,register} = require("../controllers/auth-controllers");
// // router.get('/',(req,res)=>{
// //     res.status(200).send("welcome to world best mern stack course");

// // })

// router.route("/").get(home);

// router.route('/register').get(register);
// module.exports = router;




const express = require('express');
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
// router.get('/',(req,res)=>{
//     res.status(200).send("welcome to world best mern stack course");

// })

router.route("/").get(authControllers.home);

router.route('/register').post(authControllers.register);
module.exports = router;


