
var Helper_Object = function()
{

};

Helper_Object.buildObjectDomain = function(domains, links)
{
	var results 	= {};
	var temp 		= null;
	var name 		= null;
	var objLinks 	= {};

	for( var i = 0; i < domains.length; i++ )
	{
		temp 			= domains[i];
		name 			= temp.identity;
		objLinks 		= Helper_Object.buildObjectLink(name, links);

		results[name] 	= {
			id 			: temp.id,
			name		: temp.identity,
			vector 		: [],
			arrKey		: [],
			links 		: objLinks,
			distance 	: -1,
			range 		: -1
		};

	}

	

	return results;
};

Helper_Object.buildObjectLink = function(domain, links)
{
	
	var results 	= {};
	var temp 		= null;
	var name 		= null;

	for( var i = 0; i < links.length; i++ )
	{
		temp 		= links[i];
		name 		= temp.id; //xây dựng theo id - cần xem xét lại
		if( domain === temp.id_domain )
		{
			
			temp.vector 	= [];
			temp.arrKey 	= [];
			temp.distance 	= -1;
			temp.range 		= -1;
			

			results[name] 	= temp;
		}
	}

	return results;
};

module.exports = Helper_Object;