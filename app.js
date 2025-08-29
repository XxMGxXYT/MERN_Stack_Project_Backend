import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import path from 'path';
import cors from 'cors';
import productsRoute from './routes/productsRoute.js';
const app = express();
const port = process.env.PORT || 2003;

connectDB();
// Middleware to enable CORS
app.use(cors({
    origin: 'https://mern-stack-project-backend-flame.vercel.app', // Allow requests from the frontend
    credentials: true // Allow cookies to be sent with requests
}));

app.use(express.static('public')); // Serve static files from the 'public' directory

app.use(express.json()); // Middleware to parse JSON bodies

// Define API routes
app.use("/api/products", productsRoute);

// Serve the index.html file for all other routes (not matching API)
app.use("/", (req, res) => {
    res.sendFile(path.join(path.resolve(), 'public', 'index.html'));
});


// Connect to MongoDB
mongoose.connection.once("open", () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port} and link is http://localhost:${port}`);
        // console.log(`Server is running on port ${port}`);
    })
})
