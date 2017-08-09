var express = require('express');
var router = express.Router();
var MessageModel = require('../models/message');

var checkLogin = require('../middlewares/check').checkLogin;

// router.get('/', function(req, res, next) {
//    console.log('listlist')
//    res.render('list');
// });

// GET /list 所有指令显示界面
router.get('/', checkLogin,function(req, res, next) {
    MessageModel.getAllMsg()
        .then(function (msgs) {
            res.render('list', {
                msgs: msgs
            });
        })
        .catch(next);
});

// GET /list/create 创建指令页面
router.get('/create', checkLogin, function(req, res, next) {
    res.render('create');
});

// POST /list/create 创建一条指令
router.post('/create', checkLogin, function(req, res, next) {
    var command = req.fields.command;
    var descripition = req.fields.descripition;
    var content = req.fields.content;

    // 校验参数
    try {
        if (!command.length) {
            throw new Error('请填写命令');
        }
        if (!descripition.length) {
            throw new Error('请填写描述');
        } 
        if (!content.length) {
            throw new Error('请填写内容');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }

    var msg = {
	    command: command,
	    descripition: descripition,
	    content: content
    };

    MessageModel.create(msg)
        .then(function (result) {
            // 此 post 是插入 mongodb 后的值，包含 _id
            msg = result;
            req.flash('success', '添加成功');
            // 发表成功后跳转到该文章页
            res.redirect('/list');
        })
        .catch(next);
});



// GET /list/:msgId/edit 更新指令页面
router.get('/:msgId/edit', checkLogin, function(req, res, next) {
    var msgId = req.params.msgId;

    MessageModel.getMsgById(msgId)
        .then(function (msg) {
            console.log('msg',msg);

            if (!msg) {
                throw new Error('该命令不存在');
            }
            res.render('edit', {
                msg: msg
            });
        })
        .catch(next);
});
// POST /list/:msgId/edit 更新一条指令
router.post('/:msgId/edit', checkLogin, function(req, res, next) {
	var msgId = req.params.msgId;
    var command = req.fields.command;
    var descripition = req.fields.descripition;
    var content = req.fields.content;

    MessageModel.updateMsgById(msgId, { command: command, descripition: descripition, content:content})
        .then(function () {
            req.flash('success', '编辑指令成功');
            // 编辑成功后跳转到上一页
            res.redirect('/list');
        })
        .catch(next);
});

// GET /list/:msgId/remove 删除一条指令
router.get('/:msgId/remove', checkLogin, function(req, res, next) {
    var msgId = req.params.msgId;

    MessageModel.delMsgById(msgId)
        .then(function () {
            req.flash('success', '删除指令成功');
            // 删除成功后跳转到主页
            res.redirect('/list');
        })
        .catch(next);
});



module.exports = router;