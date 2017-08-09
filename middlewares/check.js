module.exports = {
    checkLogin: function checkLogin(req, res, next) {
        if (!req.session.user) {
            req.flash('error', '用户没有登录');
            return res.redirect('/signin');
        }
        next();
    },

    checkNotLogin: function checkNotLogin(req, res, next) {
        if (req.session.user) {
            req.flash('error', '用户已登录');
            return res.redirect('back');//·µ»ØÖ®Ç°µÄÒ³Ãæ
        }
        next();
    }
};