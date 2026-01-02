const express = require("express");
const Blog = require("../models/blog");
const User = require("../models/users");
const router = express.Router();
const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

router.post("/create", async (req, res) => {
    try {
        const { title, content, authorId } = req.body;

        const token = req.headers.authorization;

        // decode token
        const data = jwt.verify(token, secretKey);

        const user = await User.findById(data.userId);

        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const blog = await Blog.create({ title, content, authorId });
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;