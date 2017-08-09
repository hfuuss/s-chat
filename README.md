# 项目简介

本系统客户端基于微信公众号开发，后台微信机器人管理系统采用B/S架构，基于nodejs，使用expressjs框架和mongodb数据库进行开发，能够快速敏捷的进行开发。同时采用了es6标准语法，有利于后期移植和维护。在功能上解决了公司客服人员经常重复回答常规性问题而消耗大量的人力物力。此外，由于本系统基于微信公众号开发，客户仅仅需要关注微信公众号就能进行相应的服务，客户不需要下载新的软件。


# 前提
微信开发需要使用一台公网服务器进行验证。具体可查看[微信公众号开发文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1445241432)    

连接微信，映射端口命令： ssh root@ip -CNfg -R 0.0.0.0:80:localhost:2222


# 环境配置
node版本： v6.10.0
mongodb版本： v3.2.10


# 使用方法
1、git clone     
2、cd s-chat  
3、npm install

# window配置方法
    
1、在db目录下面开启数据库服务： mongod --dbpath=./   
2、在根目录下面执行程序： node --harmony .\index.js   
3、访问 localhost:2222 即可登录到后台管理系统   
4、在/config/default.js里面配置你公众号的appid和encodingAESKey。




# 文件目录结构：

│  index.js       文件入口
│  package.json   npm包管理配置文件
│  README.md
│  test.js        分词测试文件
│  wechat.js      微信通信文件，AI文件接口
│  wordCut.js     分词文件
│  
├─config
│      default.js 默认配置文件
│      
├─db              数据库目录
│          
├─lib
│      mongo.js    collection定义文件
│      
├─logs				日志文件
│      error.log    
│      success.log
│      
├─middlewares        中间件，坚持用户是否登录
│      check.js
│      
├─models            collection的操作方法(CURD)
│      message.js
│      users.js
│          
├─node_modules       npm模块
│  
│              
├─public            静态文件等
│  ├─css
│  │      style.css
│  │      
│  └─img
│         
├─routes			路由文件
│      index.js
│      list.js
│      signin.js
│      signout.js
│      signup.js
│      
│      
├─tuling              图灵接口
│      turingRobot.js
│      
└─views               视图文件
    │  404.ejs
    │  create.ejs
    │  edit.ejs
    │  error.ejs
    │  footer.ejs
    │  header.ejs
    │  list.ejs
    │  signin.ejs
    │  signup.ejs
    │  
    ├─components
    │      comments.ejs
    │      nav-setting.ejs
    │      nav.ejs
    │      notification.ejs
    │      post-content.ejs



# 数据分析对外api接口

请求方法 get
/api/users  获取所有用户数据
/api/msgs   获取所有信息数据


测试页面 浏览器中输入
http://localhost:2222/test
发送信息既可以不通过微信进行离线测试。测试内容在终端输出。

### update 2017/06/08

toMongo.js 读取zhuanli.txt文件中的每一行，读取之后分词，分词之后，将相关内容存到数据库中。

在wechat.js和test.js中增加了数组的原型链的indexOf，remove，removeAll等方法。增加了字符串中toArr方法。

在wechat.js和test.js中增加了过滤停用词的过滤器。封装不好。读取stopword.txt，并且移除分词结果中的停用词。

算法由原来的判断命令是否包含最多，换成了匹配分词数组的相互匹配度。


# 部分运行截图
pc端后台系统
![](http://images.hfuusec.cn/17-8-9/65662052.jpg)
pc端注册页面
![](http://images.hfuusec.cn/17-8-9/84110144.jpg)
pc端指令编辑页面
![](http://images.hfuusec.cn/17-8-9/37595172.jpg)
pc端指令详情编辑页面
![](http://images.hfuusec.cn/17-8-9/49767855.jpg)
微信端信息展示页面
![](http://images.hfuusec.cn/17-8-9/8656101.jpg)
pc端离线测试页面
![](http://images.hfuusec.cn/17-8-9/93960214.jpg)

# 协议
LGPL