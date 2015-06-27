var Domains 					= require(__dirname + '/../models/Domains');
var KeywordDomains				= require(__dirname + '/../models/DomainKeyword');


var DataControl = function()
{

};

DataControl.prototype.getDomains = function()
{
	var domains 	= Domains.data;

	return domains;
};

DataControl.prototype.getKeywords = function()
{
	var keywords 	= KeywordDomains.data;

	return keywords;
};

DataControl.prototype.process = function()
{
	var arrDomains 	= this.getDomains();
	var arrKeywords	= this.getKeywords();

	var results 	= this.classifyDomains(arrDomains, arrKeywords);

	return results;
};

DataControl.prototype.classifyDomains = function(domains, keywords)
{
	var storage 	= [];
	var index 		= 0;

	for( var i = 0 ; i < keywords.length; i++ )
	{
		for( var j = 0; j < domains.length; j++ )
		{
			if(keywords[i].id_domain.indexOf(domains[j].identity))
			{
				storage.push({
					id 			: index++,
					domain 		: domains[j].identity,
					domain_name	: domains[j].name,
					keyword 	: keywords[i].keyword
				})
			}
		}
	}

	return storage;
};

module.exports = DataControl;
