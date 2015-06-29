var async 					= require('async');

var Domains 				= require(__dirname + '/../models/Domains');
var DomainKeyword 			= require(__dirname + '/../models/DomainKeyword');
var Links 					= require(__dirname + '/../models/Links');
var KeywordLink 			= require(__dirname + '/../models/KeywordLink');
var ShortForm 				= require(__dirname + '/../models/ShortForm');

var Helper_Object 			= require(__dirname + '/../Helper/Object');
var Helper_RegExp 			= require(__dirname + '/../Helper/RegExp');

var Analyzer = function(){

	this.modelDomains 			= new Domains();
	this.modelDomainKeyword 	= new DomainKeyword();
	this.modelLinks 			= new Links();
	this.modelKeywordLink		= new KeywordLink();
	this.modelShortForm			= new ShortForm();

	this.init();
};

Analyzer.prototype.init = function()
{
	this.arrDomainKeyword		= [];
	this.arrLinkKeyword 		= [];

	this.arrShortForm 			= [];

	this.domains 				= {};
	// this.links 					= {};

	this.loadData();
};

Analyzer.prototype.loadData = function()
{
	var that  	= this;
	async.parallel({
		'domains'			: function(callback)
		{
			that.modelDomains.fetchAll(callback);
		},
		'domain_keywords'	: function(callback)
		{
			that.modelDomainKeyword.fetchAll(callback);
		},
		'links'				: function(callback)
		{
			that.modelLinks.fetchAll(callback);
		},
		'link_keywords'		: function(callback)
		{
			that.modelKeywordLink.fetchAll(callback);
		},
		'short_forms'		: function(callback)
		{
			that.modelShortForm.fetchAll(callback);
		}
	}, function(error, results){

		if(error)
		{
			console.log('Load DB ERROR!');
			return;
		}

		var domains 			= results['domains'];
		var domain_keywords		= results['domain_keywords'];
		var links 				= results['links'];
		var link_keywords 		= results['link_keywords'];
		var short_forms 		= results['short_forms'];

		if( domains.length = 2 )
		{
			domains 			= domains[0];
		}
		if( domain_keywords.length = 2 )
		{
			domain_keywords 		= domain_keywords[0];
		}
		if( links.length = 2 )
		{
			links 				= links[0];
		}
		if( link_keywords.length = 2 )
		{
			link_keywords 		= link_keywords[0];
		}
		if( short_forms.length = 2 )
		{
			short_forms 		= short_forms[0];
		}

		that.arrShortForm 		= short_forms;

		that.arrDomainKeyword 	= domain_keywords;
		that.arrLinkKeyword 	= link_keywords;

		that.buildData(domains, domain_keywords, links, link_keywords);
		
	});
};

Analyzer.prototype.buildData = function(domains, keyword_domains, links, keyword_links)
{
	if( !domains.length || !keyword_domains.length ||
		!links.length || !keyword_links.length)
	{
		console.log('Chưa có dữ liệu từ DB!');
		return;
	}

	this.domains 			= Helper_Object.buildObjectDomain(domains, links);

	for( var name in this.domains )
	{
		this.domains[name] 	= this.buildVectorForDomain(this.domains[name], keyword_domains, keyword_links);
	}

};

Analyzer.prototype.buildVectorForDomain = function(domain, keyword_domains, keyword_links)
{
	this.buildVectorDomain(domain, keyword_domains);

	var links 	= domain.links;
	for( var name in  links)
	{
		this.buildVectorLink(links[name], keyword_domains, keyword_links);
	}

	return domain;
};

Analyzer.prototype.buildVectorDomain = function(domain, arrKeywords)
{
	for( var i = 0; i < arrKeywords.length; i++ )
	{
		
		if( domain.name === arrKeywords[i].id_domain )
		{
			domain.arrKey.push({
				keyword 	: arrKeywords[i].name,
				exits 		: 1
			});
			domain.originKey.push(arrKeywords[i].name);
			domain.vector.push(1);
			continue;
		}
		domain.arrKey.push({
			keyword 	: arrKeywords[i].name,
			exits 		: 0
		});
		domain.vector.push(0);
	}
};

Analyzer.prototype.buildVectorLink = function(link, keyword_domains, arrKeywords)
{
	for( var i = 0; i < arrKeywords.length; i++ )
	{
		if( link.id === arrKeywords[i].id_link )
		{
			link.arrKey.push({
				keyword 	: arrKeywords[i].name,
				exits 		: 1
			});
			link.originKey.push(arrKeywords[i].name);
			link.vector.push(1);
			continue;
		}
		link.arrKey.push({
			keyword 	: arrKeywords[i].name,
			exits 		: 0
		});
		link.vector.push(0);
	}
};

Analyzer.prototype.preProcessSentence = function(content)
{
	/**
	 |------------------------------------------
	 | Cho nay dung de preprocess cho sentence
	 |------------------------------------------
	 */
	var _content 	= content.trim();
		_content	= this.prepairContent(_content);

	this.countKeywordInDomain(content);

	return _content;
};

Analyzer.prototype.prepairContent = function(content)
{
	// console.log('this.arrShortForm: ', this.arrShortForm);
	if( !this.arrShortForm.length )
	{
		return content;
	}

	for( var i = 0; i < this.arrShortForm.length; i++ )
	{
		content 	= this.prepairShortForm(
			this.arrShortForm[i].short_name,
			this.arrShortForm[i].full_name,
			content
		);
	}

	return content;
};

Analyzer.prototype.prepairShortForm = function(arrKeyword, name, content)
{
	var keywords 	= null;
	try{
		keywords 	= JSON.parse(arrKeywords);
	}
	catch(e)
	{
		return content;
	}
	// console.log('-------------------------');
	// console.log('keywords: ', keywords);
	for( var i = 0; i < arrKeyword.length; i++ )
	{
		content 	= content.replace(arrKeyword[i], name);
	}
	// console.log('sentences: ', content);
	return content;
};

Analyzer.prototype.countKeywordInDomain = function(content)
{
	for( var name in this.domains )
	{
		this.domains[name].countKey = this.getKeyword(content, this.domains[name].originKey);
		this.countKeywordLinks(content, this.domains[name]);
	}
};

Analyzer.prototype.getKeyword = function(content, arrKeywords)
{
	var results = 0;
	for( var i = 0; i < arrKeywords.length; i++ )
	{
		if( this.isCandidate(content, arrKeywords[i]) )
		{
			results++;
		}
	}

	return results;
};

Analyzer.prototype.countKeywordLinks = function(content, domain)
{
	var links 	= domain.links;
	for(var name in links)
	{
		links[name].countKey = this.getKeyword(content, links[name].originKey);
	}
};

Analyzer.prototype.process = function(content, limit)
{
	/**
	 |------------------------------------------------------
	 | Input: sentence
	 | Output: 5 groups or fanpages
	 |------------------------------------------------------
	 */

	if( !Object.keys(this.domains).length )
	{
		setTimeout(this.process.bind(this), 100);
		return;
	}

	var sentences 			= this.preProcessSentence(content);
	var vectorDomain 		= this.buildInputVector(sentences, this.arrDomainKeyword);
	var vectorLink 			= this.buildInputVector(sentences, this.arrLinkKeyword);

	var domain 				= this.getDomain(vectorDomain);
	var arrLinks 			= this.getLink(this.domains[domain].links, limit, vectorLink);
	
	return arrLinks;
};

Analyzer.prototype.getLink = function(links, limit, vector)
{
	var arrLinks 			= [];
	for( var name in links)
	{
		arrLinks.push(links[name]);
	}

	arrLinks.sort(function(obj1, obj2) {
		return obj2.countKey - obj1.countKey;
	});
	// console.log('link: ', arrLinks[0]);a();
	return arrLinks.slice(0, limit);
};

Analyzer.prototype.getDomain = function(vectorDomain)
{
	for( var name in this.domains )
	{
		this.domains[name].distance 	= Helper_Object.distanceTwoObject(this.domains[name].vector, vectorDomain.vector);
	}

	var arrDomains = [];
	for( var name in this.domains )
	{
		arrDomains.push(this.domains[name]);
	}

	arrDomains.sort(function(obj1, obj2) {
		// Ascending: first age less than the previous
		return obj1.countKey - obj2.countKey;
	});

	/**
	 |------------------------------------------------
	 | Chon ra mot domain tot nhat
	 |------------------------------------------------
	 */
	return arrDomains[arrDomains.length-1].name;

};

Analyzer.prototype.buildInputVector = function(content, arrKeywords)
{
	var results = {
		arrKey 	: [],
		vector 	: []
	};
	for( var i = 0; i < arrKeywords.length; i++ )
	{
		if( this.isCandidate(content, arrKeywords[i].name) )
		{
			results.arrKey.push({
				keyword 	: arrKeywords[i].name,
				exits 		: 1
			});
			results.vector.push(1);
			continue;
		}
		results.arrKey.push({
			keyword 	: arrKeywords[i].name,
			exits 		: 0
		});
		results.vector.push(0);
	}

	return results;
};

Analyzer.prototype.isCandidate = function(content, keyword)
{
	var	regExp 		= Helper_RegExp.buildRegExp(keyword);
	var match 		= Helper_RegExp.funcMatch(content, regExp);

	if( !match )
	{
		return false;
	}
	return true;
};

module.exports = Analyzer;