var User = require('../lib/mongo').User;

module.exports = {

    //得到所有用户
    //
     getAllUsers: function getAllUsers(){
        return User.find().exec();
    },
    // 注册一个用户
    create: function create(user) {
        return User.create(user).exec();
    },

    // 通过用户名获取用户信息
    getUserByName: function getUserByName(name) {
        return User
            .findOne({ name: name })
            .addCreatedAt()
            .exec();
    }
};