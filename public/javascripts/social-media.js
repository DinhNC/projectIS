$(document).ready(function(){
	$(".headerTitle").html("Information Retrieval Social Media");
	$(".titleGroup").html("Hệ thống phân tích các mẫu câu quảng cáo của người dùng và đưa ra những đề xuất <font color='#5bcfff'>groups</font> hoặc <font color='#5bcfff'>fanpages</font> mà người dùng nên đăng quảng cáo của mình. Ngoài ra hệ thống còn cho biết tỉ lệ chính xác của kết quả đề xuất này.");
});

$('.btn_reset').click(function(evt){
	$('#content').val("");
});

$('.btn_analyse').click(function(evt){
	var content 	= $('#sentence').val();
	var total_link 	= $('#total_link').val();
	if( !content )
	{
		alert("Sentence should not empty!");
		return;
	}

	sentenceAnalyze(content, total_link);

});

function sentenceAnalyze(content,total_link)
{
	$.ajax({
		url: "/sentence-analyze",
		data: {
			content 	: content,
			total_link	: total_link,
			t 			: new Date().getTime()
		},
		success: function(results){
			if( results.success )
			{
				setValueResults(results);
				// $("#modalReset").modal('hide');	
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

function setValueResults(results)
{
	var data 	= results.data;
	console.log('results: ', results);

	$("#table-results tbody").empty();
	$(".analyzer-info").empty();
	$("#sentence").val(results.input);

	var index 	= 0;
	if( !data.length )
	{
		$(".analyzer-info").append('Không tìm thấy dữ liệu!');
	}
	for( var i = 0; i < data.length; i++ )
	{
		index++;
		$("#table-results tbody").append("<tr>" + 
				"<td>"  + index + "</td>" +
				"<td>"  + "<a href=https://www.facebook.com/" + data[i].id_social + "> " + data[i].name + "</a>" + "</td>" +
				"<td style='text-align:right'>"  + data[i].type + "</td>" +
				"<td style='text-align:right'>"  + data[i].like + "</td>" +
				"<td style='text-align:right'>"  + data[i].share + "</td>" +
			"</tr>");
	};

	// $(".score-results").empty();
	// if( results instanceof Object )
	// {
	// 	$(".score-results").html("Total score: " +
	// 			"<b>" + score + "</b>");
	// }
	// else{
	// 	$(".score-results").html("Total score: " +
	// 			"<b>" + results + "</b>");	
	// }
	// $(".text-results").text(JSON.stringify(text));
};
