var async 					= require('async');

var Domains 				= require(__dirname + '/../models/Domains');
var DomainKeyword 			= require(__dirname + '/../models/DomainKeyword');
var Links 					= require(__dirname + '/../models/Links');
var KeywordLink 			= require(__dirname + '/../models/KeywordLink');
var Helper_Object 			= require(__dirname + '/../Helper/Object');

var Analyzer = function(){

	this.modelDomains 			= new Domains();
	this.modelDomainKeyword 	= new DomainKeyword();
	this.modelLinks 			= new Links();
	this.modelKeywordLink		= new KeywordLink();

	this.init();
};

Analyzer.prototype.init = function()
{
	this.domains 				= {};
	this.links 					= {};

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
		'keyword_domain'	: function(callback)
		{
			that.modelDomainKeyword.fetchAll(callback);
		},
		'links'				: function(callback)
		{
			that.modelLinks.fetchAll(callback);
		},
		'keyword_link'		: function(callback)
		{
			that.modelKeywordLink.fetchAll(callback);
		}
	}, function(error, results){

		if(error)
		{
			console.log('Load DB ERROR!');
			return;
		}

		var domains 			= results['domains'];
		var keyword_domain		= results['keyword_domain'];
		var links 				= results['links'];
		var keyword_link 		= results['keyword_link'];

		if( domains.length = 2 )
		{
			domains 			= domains[0];
		}
		if( keyword_domain.length = 2 )
		{
			keyword_domain 		= keyword_domain[0];
		}
		if( links.length = 2 )
		{
			links 				= links[0];
		}
		if( keyword_link.length = 2 )
		{
			keyword_link 		= keyword_link[0];
		}

		that.buildData(domains, keyword_domain, links, keyword_link);
		
	});
};

Analyzer.prototype.buildData = function(domains, keyword_domains, links, keyword_links)
{
	if( !domains.length || !keyword_domains.length ||
		!links.length || !keyword_links.length)
	{
		throw new ERROR('Chưa có dữ liệu từ DB!');
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
	console.log('results: ', domain);a();
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
			link.vector.push(1);
			continue;
		}
		link.arrKey.push({
			keyword 	: arrKeywords[i].name,
			exits 		: 0
		});
		link.vector.push(0);
	}
	console.log('link: ', link);a();
};

Analyzer.prototype.process = function(content, callback)
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
};

module.exports = Analyzer;