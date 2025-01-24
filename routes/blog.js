const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();
const { isLoggedIn } = require('../middleware');

router.get('/blogs', isLoggedIn, async (req, res) => {
    try {
        let blogs = await Blog.find({});
        res.render('blogs/index', { blogs });
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
});

router.get('/blog/new', isLoggedIn, (req, res) => {
    try {
        res.render('blogs/new');
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
});

router.post('/blogs', isLoggedIn, async (req, res) => {
    try {
        let { name, title, image, desc } = req.body;
        await Blog.create({ name, title, image, desc });
        req.flash('success', 'Your Blog added successfully :)');
        res.redirect('/blogs');
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
});

router.get('/blogs/:id', isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Blog.findById(id);
        res.render('blogs/show', { foundProduct });
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
});

router.get('/blogs/:id/edit', isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Blog.findById(id);
        res.render('blogs/edit', { foundProduct });
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
});

router.patch('/blogs/:id', isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        let { name, title, image, desc } = req.body;
        await Blog.findByIdAndUpdate(id, { name, title, image, desc });
        req.flash('success', 'You blog edited successfully :)');
        res.redirect(`/blogs/${id}`);
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
});

router.delete('/blogs/:id', isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        await Blog.findByIdAndDelete(id);
        req.flash('success', 'Blog deleted successfully');
        res.redirect('/blogs');
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
});

module.exports = router;
