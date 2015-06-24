$(document).ready(function(){
	$(".headerTitle").html("Information Retrieval Social Media");
	$(".titleGroup").html("Hệ thống phân tích các mẫu câu quảng cáo của người dùng và đưa ra những đề xuất <font color='#5bcfff'>groups</font> hoặc <font color='#5bcfff'>fanpages</font> mà người dùng nên đăng quảng cáo của mình. Ngoài ra hệ thống còn cho biết tỉ lệ chính xác của kết quả đề xuất này.");
});

$('.btn_reset').click(function(evt){
	$('#content').val("");
});

$('.btn_analyse').click(function(evt){
	var content 	= $('#sentence').val();
	if( !content )
	{
		alert("Sentence should not empty!");
		return;
	}

	sentenceAnalyze(content);
});

function sentenceAnalyze(content)
{
	$.ajax({
		url: "/sentence-analyze",
		data: {
			content 	: content,
			t 			: new Date().getTime()
		},
		success: function(results){
			if( results.success )
			{
				$("#modalReset").modal('hide');	
			}
			else{
				alert('Error!');
			}
		},
		error: function(err){
			console.log("err", err);
		}
	}).done(function() {
		console.log('reload pages');
	});
};
