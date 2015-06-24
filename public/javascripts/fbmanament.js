function routingForFormAudienceFacebookManagement() {
	var input = document.getElementById("inputText").value;
	if( input.search(/[a-z]/i) < 0 )
	{
		setActionForm('formSearch','/fbmanagement/search-by-id');
		submitFormById('formSearch');
	}
	else
	{
		var splitString = input.split("/");
		var firstItem 	= splitString[0];
		if( firstItem === "https:" || firstItem === "http:" || input.indexOf("www") !== -1)
		{
			setActionForm('formSearch','/fbmanagement/search-by-api');
			submitFormById('formSearch');
		}
		else {
			setActionForm('formSearch','/fbmanagement/search-by-name');
			submitFormById('formSearch');
		}
	}
}