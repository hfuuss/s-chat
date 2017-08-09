module.exports = {
  port: 2222,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myblog',
  wechat: {
	  token: 'zhangsan',
	  appid: 'yourappid',
	  encodingAESKey: 'yourkey'
	}
};