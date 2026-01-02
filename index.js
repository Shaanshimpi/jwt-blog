require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
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
app.use(cors());

// Routes
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");
app.use("/api/blog", blogRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});