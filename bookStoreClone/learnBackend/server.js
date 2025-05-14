




// const express = require('express');
// const app = express();
// const port = 3000;

// // 🛡️ Middleware (like security check)
// const checkTimeMiddleware = (req, res, next) => {
//     const hour = new Date().getHours();
//     console.log(`Current hour: ${hour}`);
//     if (hour < 9 || hour > 20) {
//         return res.send('Sorry, we only serve requests between 9AM and 5PM.');
//     }
//     console.log(`Current system hour: ${hour}`);

//     console.log('Time check passed ✔');
//     next();
// };

// // Apply middleware globally
// app.use(checkTimeMiddleware);

// // Final route handler
// app.get('/', (req, res) => {
//     res.send('Welcome! You’re within working hours.');
// });
// app.get('/welcome', (req, res) => {
//     res.send('Welcome!');
// });

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });



const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();
const port = 5001;

//built in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static",express.static(path.join(__dirname, 'public')));

const loggerMiddleware = (req,res,next)=>{
    console.log(`${new Date()} ---Request [${req.method}] [${req.url}] `);
    next();
};

app.use(loggerMiddleware);

//third party middleware
//router level middleware
app.use("/api/users",router);

const fakeAuth = (req, res, next) => {
    const authStatus = true;
    if (authStatus) {
        console.log('User is authenticated',authStatus);
        next();
    } else {
        res.status(401);
        throw new Error('user is not authorized');
    }
}

const getUsers = (req, res) => {
    res.json({ message: 'Get all users' });
}
const createUser = (req, res) => {
    console.log("this is the request body received from client",req.body);
    res.json({ message: 'Create new user' });
}

router.use(fakeAuth);

router.route('/').get(getUsers).post(createUser);

//error handling middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    switch (statusCode) {
        case 401:
            res.json({
                title: 'Unauthorized',
                message: err.message
            });
            break;
        case 404:
           res.json({
                title: 'Not Found',
                message: err.message
            });
            break;
        default:
           res.json({
                title: 'SERVER ERROR',
                message: err.message
            });
            break;
    }
};

app.all("*",(req,res)=>{
    res.status(404);
    throw new Error(`This route is not found`);
});

app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


