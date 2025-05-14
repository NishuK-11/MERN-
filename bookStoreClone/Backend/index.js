import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // should be called early
import bookRoute from './route/route.js';
import userRoute from './route/user.route.js';
const app = express(); // declare `app` before using it

app.use(cors()); // now you can use it
app.use(express.json()); // to parse JSON requests

const PORT = process.env.PORT || 5001;



const URI = process.env.MongoDBURI;

// connect to MongoDB
try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    console.log("Connected to MongoDB");
} catch (err) {
    console.log("Error:", err);
}

// connect routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

