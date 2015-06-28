
var qs 						= require('querystring');
var express                 = require('express');
var async 					= require('async');
var qs              		= require('querystring');
var router                  = express.Router();
var ModelDomains 			= require(__dirname + '/../models/Domains');
var ModelDomainKeyword 		= require(__dirname + '/../models/DomainKeyword');
var Links 					= require(__dirname + '/../models/Links');
var KeywordLink 			= require(__dirname + '/../models/KeywordLink');

var modelDomains 			= new ModelDomains();
var modelDomainKeyword 		= new ModelDomainKeyword();
var modelLinks 				= new Links();
var modelKeywordLink		= new KeywordLink();

var headerTitle             = 'Data Management';

var DBlimit 				= 20;

router.all("/",function(req, res, next) {

	var input 				= req.param('input') || '';

	if( !req.query.page )
    {
        req.query.page 		= 0;   
    }
    req.query.page  		= req.query.page | 0;
    var page        		= req.query.page;
    res.locals.query 		= req.query;

    async.parallel({
		'domains'			: function(callback)
		{
			modelDomains.fetchAll(callback);
		},
		'domain_keywords'	: function(callback)
		{
			modelDomainKeyword.fetchAll(callback);
		},
		'links'				: function(callback)
		{
			modelLinks.fetchAll(callback);
		},
		'link_keywords'		: function(callback)
		{
			modelKeywordLink.fetchAll(callback);
		}
	}, function(error, results){

		var domains 			= results['domains'];
		var domain_keywords		= results['domain_keywords'];
		var links 				= results['links'];
		var link_keywords 		= results['link_keywords'];

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

		var data 				= classifyData(links, link_keywords);
		var totals 				= data.length;
			data 				= data.slice(req.query.page?req.query.page*20:0,req.query.page?(req.query.page+1)*20:20)	

		if( error )
		{
			res.render('error/index', {
				error		: "ERROR !",
				title		: "ERROR !",
				message		: "Đã có lỗi xãy ra, Vui lòng thử lại.",
				detail		: error
			});
			return;
		}
		
		res.render('datacontrol', {
			title 			: 'DataSet',
	        input			: input,
	        total_pages		: totals,
	        data 			: data,
	        qs 				: qs,
	        headerTitle 	: headerTitle
		});
	});
	return;
});

router.all("/add-keyword", function(req, res){
	var id 				= req.param('id') || '';
	var keywords 		= req.param('keywords') || '';

	console.log('id: ', [id, keywords]);
	var data 			= classifyAddKeyword(id, keywords);
	modelKeywordLink.savekeyword(data, function(error, results){
		if( error )
		{
			console.log('SAVE ERROR: ', error);
			res.send('error/index', {
				error 		: true,
				success 	: false,
				message		: 'Insert success!'
			});
			return;
		}
		
		res.send({
			error 		: false,
			success 	: true,
			message		: 'Insert success!'
		});
	});

});

function classifyAddKeyword(id, arrKeywords)
{
	var keywords 		= arrKeywords.split(',');
	var storage			= [];
	var key 			= null;
	for( var i = 0; i < keywords.length; i++ )
	{
		key 	= keywords[i].trim();
		key 	= key.toLowerCase();
		if( !key )
		{
			continue;
		}
		storage.push({
			id_link 	: id,
			name 		: key
		})
	}

	return storage;
}

function classifyData(links, arrKeywords)
{
	var storage 	= [];
	for( var i = 0; i < links.length; i++ )
	{
		links[i].arrKeywords 	= [];
		links[i].keywords 		= [];
		for( var j = 0; j < arrKeywords.length; j++ )
		{
			if(arrKeywords[j].id_link === links[i].id)
			{
				links[i].arrKeywords.push(arrKeywords[j]);
				links[i].keywords.push(arrKeywords[j].name);
			}
		}
		links[i].keywords = links[i].keywords.join(", ");
		storage.push(links[i]);
	}

	return storage;
};


module.exports = router;