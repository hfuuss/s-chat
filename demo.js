
//js 数组实现removeAll
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

var arr = ['1','24','3','5','1','2','3','4']

arr.removeAll(1)
console.log(arr)//[ '24', '3', '5', '2', '3', '4' ]
 
 
 //字符数组互转
String.prototype.toArr = function() {
	  return this.split(',')
};

var arr = ['1','24','3','5','1','2','3','4']
var str = arr.toString()//1,24,3,5,1,2,3,4
console.log(str)
console.log(str.toArr())//[ '1', '24', '3', '5', '1', '2', '3', '4' ]

