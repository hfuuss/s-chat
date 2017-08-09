const request = require('request');
const config = {
  turingKey :'b4b4af8d26f849b09122ae7ae0c425dd'
}

function getTuringResponse(userid,info) {
  // if(typeof info !== 'string') {
  //   info = info.toString();
  // }
  //console.log('userid ',userid,'info ',info);
  
  return new Promise((resolve, reject) => {
    request.post({url:'http://www.tuling123.com/openapi/api',form:{"key":config.turingKey,"info":info,"userid":userid.substring(userid.length - 6)}/*,proxy:'http://127.0.0.1:8080'*/}, function (err, res, body) {
      if (res) {
        resolve(body);
      } else {
        reject(err);
      }
    });
  })
}

module.exports = getTuringResponse;