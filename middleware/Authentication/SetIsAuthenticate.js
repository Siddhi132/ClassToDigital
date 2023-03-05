const isAuth = (req, res, next) => {
    console.log('req.session.isAuthenticated from isAuth', req.session.isAuthenticated);
    if (req.session.isAuthenticated == true) {
        next();
    } else {
        var login = 0;
        res.render('Home/Home', { "login": login });
    }

};


const isLoginRequired = (req, res, next) => {
    console.log('req.session.isAuthenticated from isAuth', req.session.isAuthenticated);
    if (req.session.isAuthenticated == true) {
        next();
    } else {
        var login = 0;
        res.render('Home/Login');
    }
};



module.exports = {isAuth, isLoginRequired};