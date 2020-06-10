const express = require('express');
const router = express.Router();

// Middleware
const { auth, notAuth } = require('../middleware/auth');

router.get('/', auth, (req, res) => {
    res.render('index.ejs', {
        name : req.user.name,
        id : req.user._id
    });
});

module.exports = router;