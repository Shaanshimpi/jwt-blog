const express = require("express");
const User = require("../models/users");
const router = express.Router();
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

// Register route
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const user = await User.create({ name, email, password });
        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, secretKey);

        res.status(200).json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email },
            token: token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
