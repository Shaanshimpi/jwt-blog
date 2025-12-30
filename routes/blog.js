const express = require("express");
const Blog = require("../models/blog");
const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const { title, content, authorId } = req.body;
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