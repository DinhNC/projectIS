$(document).ready(function() {
	$("#type").select2();
	// $('#categories').select2();
	//Hover
	$("td.hover-data").popover({
		html		: true,
		trigger		: 'hover'
	});
});