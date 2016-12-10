/**
 * Created by hasee on 2016/11/8.
 */
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/posts');
    });
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/posts', require('./posts'));
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.render('404');
        }
    });
};