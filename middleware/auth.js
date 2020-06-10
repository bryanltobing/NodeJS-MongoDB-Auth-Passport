const auth = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect('/users/login');
}

const notAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();   
}

module.exports = { auth, notAuth } 