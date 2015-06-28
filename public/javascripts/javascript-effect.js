$(document).ready(function(){
	var url = window.location.href;
	
	// add effect for option value of select tags
	$("option:contains('IDLE')").addClass("idle-font");
	$("option:contains('ERROR')").addClass("error-font");
	$("option:contains('STOPPED')").addClass("stopped-font");
	$("option:contains('DISABLE')").addClass("disable-font");
	$("option:contains('UPDATING')").addClass("updating-font");

	//add effect state for td tags
	$("span:contains('IDLE')").addClass("idle-font bold");
	$("span:contains('ERROR')").addClass("error-font bold");
	$("span:contains('STOPPED')").addClass("stopped-font bold");
	$("span:contains('DISABLE')").addClass("disable-font bold");
	$("span:contains('UPDATING')").addClass("updating-font bold");

	// slide toggle for sort
	$("#showSort").click(function() {
		var attr = $("#showSort span").attr("class");
		$("#sort").slideToggle("fast");
		if(attr == "glyphicon glyphicon-circle-arrow-down")
		{
			$("#showSort span").removeClass("glyphicon glyphicon-circle-arrow-down");
			$("#showSort span").addClass("glyphicon glyphicon-circle-arrow-up");
		}
		else
		{
			$("#showSort span").removeClass("glyphicon glyphicon-circle-arrow-up");
			$("#showSort span").addClass("glyphicon glyphicon-circle-arrow-down");
		}
	});

	//slide toggle for detail
	$("#showDetail").click(function() {
		$("#detail").slideToggle("fast");
	});

	//check all checkbox input
	$('#checkAll').click(function() {
        var cbArray = $('input:checkbox');
        var nLength = cbArray.length;
        for(var i = 0; i < nLength; i++){
            if(!($(cbArray[i]).is(':disabled')))
                $(cbArray[i]).prop('checked', $(this).prop('checked'));
        }
    });

    //effect menu
    $('#menu a').each(function() {
        var string = url.split('?');
        if(this.href === string[0]) {
            $(this).closest('li').addClass('active');
            $(this).parents('li').addClass('active');
            return;
        }
    });
});
