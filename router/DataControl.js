
var qs 						= require('querystring');
var express                 = require('express');
var router                  = express.Router();
var DataControl 			= require(__dirname + '/../models/DataControl');

var modelDataControl 		= new DataControl();
var headerTitle             = 'Information Retrieval Social Media';

var DBlimit 				= 20;

router.all("/",function(req, res, next) {

	var input 				= req.param('input') || '';
	var results 			= modelDataControl.process();
	var total_pages			= results.length;

	if( !req.query.page )
    {
        req.query.page 		= 0;   
    }
    req.query.page  		= req.query.page | 0;
    var page        		= req.query.page;
    res.locals.query 		= req.query;

    var data 				= results.slice(page?(page-1)*DBlimit:0, page?page*20:20);
    console.log('data: ', data);

    res.render('datacontrol', {
        title 			: 'DataSet',
        input			: input,
        total_pages		: total_pages,
        data 			: data,
        headerTitle 	: headerTitle
    });
});

// router.all("/sentence-analyze", function(req, res){
// 	var content 	= req.param('content') || '';

// 	var results 	= modelAnalyzer.process(content)
// 	console.log('content: ', content);

// });

module.exports = router;