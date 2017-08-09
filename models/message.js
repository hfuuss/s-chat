var Message = require('../lib/mongo').Message;

module.exports = {

    getAllMsg: function getAllMsg(){
        return Message.find().exec();
    },
    // 创建一条内容
    create: function create(msg) {
        return Message.create(msg).exec();
    },

    // 通过id获取命令内容
    getMsgById: function getMsgById(id) {
        return Message
            .findOne({ _id: id })
            .addCreatedAt()
            .exec();
    },
    // 通过命令获取命令内容
    getMsgByCommand: function getMsgByCommand(command) {
        return Message
            .findOne({ command: command })
            .addCreatedAt()
            .exec();
    },
    // 通过 id 更新一条命令
    updateMsgById: function updateMsgById(id,data) {
        return Message.update({ _id: id}, { $set: data }).exec();
    },

// 通过id 删除一条命令
    delMsgById: function delMsgById(id) {
        return Message.remove({ _id: id}).exec();
    }
};