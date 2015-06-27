var express                 = require('express');
var router                  = express.Router();
var async 					= require('async');

var Analyzer 				= require(__dirname + '/../libs/Analyzer');
var Domains 				= require(__dirname + '/../models/Domains');
var DomainKeyword 			= require(__dirname + '/../models/DomainKeyword');
var Links 					= require(__dirname + '/../models/Links');
var KeywordLink 			= require(__dirname + '/../models/KeywordLink');

var analyzer 				= new Analyzer();
var modelDomains 			= new Domains();
var modelDomainKeyword 		= new DomainKeyword();
var modelLinks 				= new Links();
var modelKeywordLink		= new KeywordLink();
var headerTitle             = 'Information Retrieval Social Media';


router.all("/",function(req, res, next) {
    res.render('analyzer', {
        title: 'Analyzer',
        headerTitle: headerTitle
    });
});

router.all("/sentence-analyze", function(req, res){
	var content 	= req.param('content') || '';

	async.parallel({
		'domains'			: function(callback)
		{
			modelDomains.fetchAll(callback);
		},
		'keyword_domain'	: function(callback)
		{
			modelDomainKeyword.fetchAll(callback);
		},
		'links'				: function(callback)
		{
			modelLinks.fetchAll(callback);
		},
		'keyword_link'		: function(callback)
		{
			modelKeywordLink.fetchAll(callback);
		}
	}, function(error, results){

		// console.log('error/results: ', error, results);

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
	        input			: input,
	        data 			: []
		});
	});
	return;
	

});

module.exports = router;