function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next()
        }else {
            // res.redirect('/login')
            res.status(401).json({message: 'Please login'});
        }
    };
}

function isGuest() {
    return (req, res, next) {
        if(req.user) {
            // res.redirect('/');
            res.status(400).json({message: "You are already logged"})
        }else {
            next();
        }
    };
}

module.exports = {hasUser, isGuest}