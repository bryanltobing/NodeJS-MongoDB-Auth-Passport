const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/users');

module.exports = function(passport) {
    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({ email });
        if(!user) {
            return done(null, false, { message : 'That email is not registered'});
        }

        try {
           const isMatch = await bcrypt.compare(password, user.password);
           if(isMatch) {
               return done(null, user);
           }
           return done(null, false, { message : 'Password incorrect'});
        } catch (e) {
            return done(e);
        }
    };
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, authenticateUser )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            return done(null, user);
        } catch(err) {
            return done(err);
        }
    });
};