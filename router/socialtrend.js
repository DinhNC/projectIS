var express                 = require('express');
var router                  = express.Router();
var async 					= require('async');

var Analyzer 				= require(__dirname + '/../libs/Analyzer');

var analyzer 				= new Analyzer();
var headerTitle             = 'Information Retrieval Social Media';

var LinksLimit 				= 5;

router.all("/",function(req, res, next) {

	var limit		= req.param('total_link') || 5;
	var content 	= req.param('content') || '';

    res.render('analyzer', {
        title 			: 'Analyzer',
        input			: content,
        link_totals		: limit,
        headerTitle 	: headerTitle
    });
    return;
});

router.all("/sentence-analyze", function(req, res)
{
	var content 	= req.param('content') || '';
	var limit		= req.param('total_link') || 5;

	var data 		= analyzer.process(content, limit);
	res.send({
		success 		: true,
        input			: content,
        link_totals		: limit,
        data 			: data
	});
	
	return;
	
});

module.exports = router;