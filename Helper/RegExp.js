var Helper_RegExp = function()
{

};

Helper_RegExp.lowerCharactor 	= '[^a-zaáàảãạăắằẳẵặâấầẩẫậeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ]';

Helper_RegExp.buildRegExp = function(name)
{
	var	keyword 	= name.trim();
		keyword 		= '(^|' + Helper_RegExp.lowerCharactor + ')' + keyword + '($|' + Helper_RegExp.lowerCharactor + ')';
	var regExp 		= new RegExp(keyword);

	return regExp;
};

Helper_RegExp.funcMatch = function(content, regExp)
{
	return content.match(regExp);
}

module.exports = Helper_RegExp;