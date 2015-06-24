function executePhrase(fileId){
	$.ajax({
		url:"/sentiment/phrase/execute",
		data: {
			fileId: fileId
		},
		success:function(result){
			console.log("executePhrase | success | ", result);
		},
		error: function(err){
			console.log("executePhrase | error | ", err);
		}
	});
}

function showMention(arrMentionId, obj){
	arrMentionId	= arrMentionId.split(",");
	$(".active").removeClass("active");
	$(obj).addClass("active");
	$(".mention").hide();
	var selector	= "";
	var mention		= "";
	var word		= $(obj).text().replace(/\s/g, "_");
	var tag = /<(\w+)[^>]*>|<\/\1>/gi;
	var str = "\u1E9B\u0323";
	console.log(str.normalize("NFC"));
	for (var i = 0; i < arrMentionId.length; i++)
	{
		if ( ! arrMentionId[i] )
		{
			continue;
		}
		selector	= "[id=" + arrMentionId[i] + "]";
		mention	= $(selector).find(".content").html();
		mention	= mention.replace(tag,"");
		mention	= mention.replace(word,"<a>" + word + "</a>");
		$(selector).find(".content").html(mention);
		$(selector).show();
	}
}

function dblClick(obj){
	if ($(obj).parent().hasClass("old_group"))
	{
		$(".insert_group").append(obj);
	}
	else
	{
		$(".old_group").append(obj);
	}
}