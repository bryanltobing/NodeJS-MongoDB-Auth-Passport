const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

// Middleware
const { auth, notAuth } = require('../middleware/auth');

const Users = require('../models/users');

const initializePassport = require('../middleware/passport-config');
initializePassport (passport);

router.get('/login', notAuth, (req, res) => {
    res.render('login');
});

router.get('/register', notAuth,  (req,res) => {
    res.render('register');
});

router.post('/register', notAuth, async (req,res) => {
    const user = new Users(req.body);
    try {
        await user.save();
        res.redirect('/users/login');
    } catch (e) {
        res.redirect('/users/register');
    }
});

router.post('/login', notAuth, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}));

router.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/users/login');
});

module.exports = router;