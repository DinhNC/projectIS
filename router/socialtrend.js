var express                 = require('express');
var router                  = express.Router();


var headerTitle             = 'Social Trend'


router.all("/",function(req, res, next) {
    res.render('test', {
        title: 'DINH OI',
        headerTitle: headerTitle
    });
});

module.exports = router;