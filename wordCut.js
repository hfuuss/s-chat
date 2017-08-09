var nodejieba = require("nodejieba");

var sentence = "播报一下今天的新闻";

var result;


function getWordArray(stc){
	result = nodejieba.cut(stc);
	if(!result){
		throw new Error('分词失败');
	}
	
	return result
}




module.exports = getWordArray;
// 没有主动调用nodejieba.load载入词典的时候，
// 会在第一次调用cut或者其他需要词典的函数时，自动载入默认词典。
// 词典只会被加载一次。
// result = nodejieba.cut(sentence);
// console.log(result);

// result = nodejieba.cut(sentence, true);
// console.log(result);

// result = nodejieba.cutHMM(sentence);
// console.log(result);

// result = nodejieba.cutAll(sentence);
// console.log(result);

// result = nodejieba.cutForSearch(sentence);
// console.log(result);

// result = nodejieba.tag(sentence);
// console.log(result);

// var topN = 5;
// result = nodejieba.extract(sentence, topN);
// console.log(result);

// result = nodejieba.cut("男默女泪");
// console.log(result);
// nodejieba.insertWord("男默女泪");
// result = nodejieba.cut("男默女泪");
// console.log(result);

// result = nodejieba.cutSmall("南京市长江大桥", 3);
// console.log(result);
