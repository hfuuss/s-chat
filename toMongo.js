var lineReader = require('line-reader');
var wordCut = require('./wordCut');

var MessageModel = require('./models/message');


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


//得到数组中元素最多的
var getElementUsedMost = function(arr){
    var hash = {};//利用hash 来记录次数
    var m = 0; //现在的最大次数
    var trueEl = null;//最大的元素
    // console.log(arr.length)
    for (var i = 0; i < arr.length; i++) {
    	if(arr[i] == '。' || arr[i] == '，') {continue }
    	// console.log(arr[i])
    	var el = arr[i];
        // console.log(arr[i])
        hash[el] === undefined ? hash[el] = 1 : (hash[el] ++);
        hash[el] >= m && (trueEl = el); 
    }

    return el;
};



var lineis = [];
var lineos = [];

lineReader.eachLine('zhuanli.txt', function(lineo, lasto) {
	lineos.push(lineo);
	
	if(lasto){
			
			lineReader.eachLine('stopwords.txt', function(linei, lasti) {
			   lineis.push(linei);
			   if(lasti){
			   	for (var i = lineos.length - 1; i >= 0; i--) {	
			   		var wordArr = wordCut(lineos[i]);

					for (var j = lineis.length - 1; j >= 0; j--) {//移除停用词
				         	wordArr.removeAll(lineis[j]);
				         }

					var keyWord = getElementUsedMost(wordArr);
					// var keyWord = getElementUsedMost(wordArr)
					// console.log('keyWord = ',keyWord)
					// console.log('some key word = ',lineos[i].slice(0,lineos[i].length - Math.round(lineos[i].length/3*2)))
					// console.log('lineo = ',lineos[i])
					var msg = {
					    command: keyWord,
					    descripition: wordArr.toString(),
					    content: lineos[i]
				    };
				    MessageModel.create(msg)
			        .then(function (result) {
			            // 此 post 是插入 mongodb 后的值，包含 _id
			            msg = result;
			            console.log('原始数据插入成功！')
			        })

			   	}
			  		console.log('toMongo.js  finish！')
			             
				}


			})
		
	}
})