require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_URL, {
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Routes
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");
app.use("/api/blog", blogRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});