/**
 * Created by hasee on 2016/11/8.
 */

var MessageModel = require('../models/message');
var UserModel = require('../models/users');


module.exports = function (app) {
    console.log('router index.js')

    //api 数据接口
    app.get('/api/users', function(req, res, next) {
            console.log('users')
            UserModel.getAllUsers()
                .then(function (users) {
                    res.send(users);
                })
                .catch(next);
        });
    
    app.get('/api/msgs', function(req, res, next) {
        console.log('msgs')
        MessageModel.getAllMsg()
            .then(function (msgs) {
                res.send(msgs);
            })
            .catch(next);
    });

    //其他路由
    app.get('/', function (req, res) {
        res.redirect('/signin');
    });
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/list', require('./list'));
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.render('404');
        }
    });
};