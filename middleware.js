module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in to access this route');
        return res.redirect('/login');
    }
    next();
};