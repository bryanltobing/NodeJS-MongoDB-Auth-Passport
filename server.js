const express = require('express');
const app = express();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

// db
require('./config/db/mongoose');

// routes
const index = require('./routes/index');
const user = require('./routes/user');

app.set('view-engine', 'ejs');

app.use(express.urlencoded( { extended : false }));
app.use(flash());
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// routes use
app.use('/', index);
app.use('/users', user);




app.listen(8000);