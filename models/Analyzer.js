var domains 		= require(__dirname + '/../data/domains/domains');



var Analyzer = function(){

};

Analyzer.prototype.process = function(content)
{
	/**
	 |------------------------------------------------------
	 | Input: sentence
	 | Output: 5 groups or fanpages
	 |------------------------------------------------------
	 */
	var sentences 	= this.preProcessSentence(content);
};

Analyzer.prototype.preProcessSentence = function(content)
{
	var _content 	= content.trim();
	var arrWords 	= _content.split(' ');

	console.log('arrWords: ', arrWords);
};

module.exports = Analyzer;