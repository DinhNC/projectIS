var express                 = require('express');
var router                  = express.Router();
var Analyzer 				= require(__dirname + '/../models/Analyzer');

var modelAnalyzer 			= new Analyzer();
var headerTitle             = 'Information Retrieval Social Media';


router.all("/",function(req, res, next) {
    res.render('datacontrol', {
        title: 'DataSet',
        headerTitle: headerTitle
    });
});

// router.all("/sentence-analyze", function(req, res){
// 	var content 	= req.param('content') || '';

// 	var results 	= modelAnalyzer.process(content)
// 	console.log('content: ', content);

// });

module.exports = router;