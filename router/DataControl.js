
var qs 						= require('querystring');
var express                 = require('express');
var async 					= require('async');
var router                  = express.Router();
var ModelDomains 			= require(__dirname + '/../models/Domains');
var ModelDomainKeyword 		= require(__dirname + '/../models/DomainKeyword');

var modelDomains 			= new ModelDomains();
var modelDomainKeyword 		= new ModelDomainKeyword();
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
		'domain_keyword'	: function(callback)
		{
			modelDomainKeyword.fetchAll(callback);
		}
	}, function(error, results){

		console.log('error/results: ', error, results);

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
	        total_pages		: 1,
	        data 			: [],
	        headerTitle 	: headerTitle
		});
	});
	return;
});

// router.all("/sentence-analyze", function(req, res){
// 	var content 	= req.param('content') || '';

// 	var results 	= modelAnalyzer.process(content)
// 	console.log('content: ', content);

// });

module.exports = router;