var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var config = require('config-lite');
var turingRobot = require('./tuling/turingRobot');
var MessageModel = require('./models/message');
var wordCut = require('./wordCut');
var lineReader = require('line-reader');
// const Promisify = require('es6-promisify');


var wechatCfg = {
  token: config.wechat.token,
  appid: config.wechat.appid,
  encodingAESKey: config.wechat.encodingAESKey
};

Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
  if (this[i] == val) return i;
  }
  return -1;  
};

Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
  this.splice(index, 1);
  }
};

Array.prototype.removeAll = function(val) {
  var len=this.length;
  var pos=0;
  while(pos<len){
    pos=this.indexOf(val,pos);
    if(pos===-1){//未找到就退出循环完成搜索
     break;
    }
    this.splice(pos, 1);//找到就存储索引
    pos+=1;//并从下个位置开始搜索
   }

};


String.prototype.toArr = function() {
  
  return this.split(',')

};
//微信接口

router.post('/', wechat(wechatCfg, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  // console.log(req.weixin);
  //图灵接口
  //TuringAnswer(req,res)
   
  // 我的接口
   MyAnswer(req,res)
  
  })
);


//图灵接口
function TuringAnswer(req,res){
  var message = req.weixin;
  var userid = message.FromUserName;
  var content = message.Content;
  console.log('content ', content, 'userid ', userid);

  turingRobot(userid,content).then(function (data) {
      console.log(data);
    var response = JSON.parse(data);
    
    res.reply(response.text);
    
  })
}

// 我的接口
function MyAnswer(req,res){
  var message = req.weixin;
  var userid = message.FromUserName;
  var Content = message.Content;
  var wordArr = wordCut(Content);//用户分词数组
  var Answers = [];  //所有的答案集合 
  var Commands = {}; //所有命令集合
  // console.log(wordArr)




var lines = [];
lineReader.eachLine('stopwords.txt', function(line, last) {
   lines.push(line);
   if(last){

             for (var i = lines.length - 1; i >= 0; i--) {//移除停用词
               wordArr.removeAll(lines[i]);
             }
                    //获取所有文件信息集合
              MessageModel.getAllMsg().
                then(function(msgs){
                     //所有命令的集合
                     for(var j=0;j<msgs.length;j++){
                        var keywords = msgs[j].descripition.toArr();//得到分词的描述数组
                        for(var i=0;i<wordArr.length;i++){
                           var tmp = wordArr[i]
                        if(keywords.indexOf(wordArr[i]) != -1){//如果关键词包含用户的分词数组
                             Answers.push(msgs[j]);
                             Commands[msgs[j]._id]=msgs[j].content;
                          }
                         }
                     }
                     //如果没有答案，则回复以下内容 图灵接口
                    if(Answers.length == 0){
                      TuringAnswer(req,res);
                      // res.reply('本人是萌萌哒远坂凛，听不懂你在说什么哦');
                    }
                    //如果存在，则评估，找出最好的答案
                    if(Answers.length > 0){
                      // 评估器，评估所有的Answers
                      // 
                      var bestCommand = evalScore(Answers);
                        //相关度小于某值时,回复 我也不确定，可能是......
                      // if(){
                      // bestAnswer = '我也不确定，可能是' + bestAnswer;
                      // }
                      var bestAnswer = Commands[bestCommand]
                      res.reply(bestAnswer);

                    }

              })
   }
});


  
        
 
}



 // 评估器，评估所有的Answers,核心
function evalScore(Answers){

  var bestAnswer = Answers[0];//默认最好的答案为第一个
  var bestCommand = Answers[0].command;
  var map = {};
//策略1  哪个个数多就回复哪个 {command:1,command:2}
  for(var i=0;i<Answers.length;i++){
        if(!map[Answers[i]._id]){
          map[Answers[i]._id] = 1;
        }else{
          map[Answers[i]._id]++;
        }
    }

  var best = 0;
  for(var m in map){
    if(map[m]>best)  {
      best = map[m];
      bestCommand = m
    }
  }
  
    return bestCommand;
  
}
    




module.exports = router;
