const express = require('express');
const router = express.Router();

router.get('/author', (req, res) => {
    res.render('create_author');
});

router.get('/book', (req, res) => {
    res.render('create_book');
});

module.exports = router;