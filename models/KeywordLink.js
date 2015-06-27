var mysql       			= require('mysql');
var phpjs       			= require('phpjs');
var unorm       			= require('unorm');

var connection = mysql.createConnection({
	host        : 'localhost',
	user        : 'root',
	password    : '',
	database    : 'monitoring_social_media'
});


var tableData 		= "link_keyword";

connection.connect(
    function(err)
    {
        if (err)
        {
            console.log("database connect err | err", err);
        }
        // console.log("DB **** connect success!");
    }
);

var LinkOfKeyword = function()
{

};

LinkOfKeyword.prototype.fetchAll = function(callback)
{
	var sql = "SELECT * FROM `" + tableData + "`";
    console.log(' sql score: ', sql);
    connection.query(
		sql,
		callback
	);
};

module.exports = LinkOfKeyword;
