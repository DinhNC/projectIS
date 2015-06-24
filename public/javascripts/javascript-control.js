//Function for mapping form action when submit by input text
//Only apply for Audience Facebook Management
function mapForFormAudienceFacebookManagement() {
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
		if( firstItem === "https:" || firstItem === "http:")
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
