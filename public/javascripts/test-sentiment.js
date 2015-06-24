$( document ).ready(function() {
	$(".headerTitle").html("Sentiment Air");
	$(".titleGroup").html("<b>" + "Sentiment Air " + "</b>" + "is an aspect-based sentiment analysis tool developed by the R&D Lab of YouNet Media. Combining lightweight NLP techniques and linguistics heuristics rules, the tool aims at inferring user opinion (like " + "<b> <font style='color:#69aa46;'>" + " positive" + "</font> </b>" + "," + "<b> <font style='color:#dd5a43;'>" + " negative " + "</font> </b>" + " or " + "<b> <font style='color:#585858;'>" + "neutral" + "</font> </b>" + ") over subjects mentioned in Vietnamese textual documents.");

});

$(".btnreset").click(function(evt){
	$("#keywords").val("");
//	$("#domain").val(2);
	$("#title").val("");
	$("#content").val("");
	$(".results_sentiment").empty();
	$(".score-results").empty();
	$("#table-results tbody").empty();
});

$(".btn_analyse").click(function(evt){
	var inputKeyWord			= $("#keywords").val();
	var inputDomain				= $("#domain").val();
	var inputTitle				= $("#title").val();
	var inputContent			= $("#content").val();
	
	if(!inputKeyWord || !inputContent)
	{
		alert("Keyword and Contents both should not empty!");
		return;
	}
	$('#modalSentiment')
	.on('show.bs.modal', function(e){
	})
	.modal('show');
	sentimentAnalyze(inputKeyWord, inputDomain, inputTitle, inputContent);
});

function sentimentAnalyze(inputKeyWord, inputDomain, inputTitle, inputContent)
{
	$.ajax({
		url: "/sentiment/testsentiment/sentiment-simulator",
		data: {  
			keywords		:	inputKeyWord,
			domain			:	inputDomain,
			title			:	inputTitle,
			content			:	inputContent
		},
		success: function(results){
			var data		= results.data;
			var score		= results.score;
			var text		= results.text;
			
			setValueResults(data, score, text);
			
			var scoreName;
			if (score >= 2147483647)
			{
				scoreName = 'UNKNOWN';
				$(".results_sentiment").html("<b>" + scoreName + "</b>");
			}
			else if(score > 0)
			{
				scoreName = 'POSITIVE';
				$(".results_sentiment").html("<b><font style='color:#69aa46;'>" + scoreName + "</font></b>");
			}
			else if(score < 0)
			{
				scoreName = 'NEGATIVE';
				$(".results_sentiment").html("<b>" + "<font style='color:#dd5a43;'>" + scoreName + "</font>" + "</b>");
			}
			else
			{
				scoreName = 'NEUTRAL';
				$(".results_sentiment").html("<b> <font style='color:#585858;'>" + scoreName + "</font> </b>");
			}
		},
		error: function(err){
			console.log("err", err);
		}
	}).done(function() {
		console.log('reload pages');
	});
}

function setValueResults(data, score, text)
{
	$("#modalSentiment").modal('hide');			
	$(".results_sentiment").empty();	

	$("#table-results tbody").empty();
	$(data).each(function(i){
		var font	= "<font>";
		if(data[i].score > 0)
		{
			font	= "<font style='color:#69aa46;'>" ;
		}
		else if(data[i].score < 0)
		{
			font	= "<font style='color:#dd5a43;'>";
		}
		$("#table-results tbody").append("<tr>" + 
				"<td>"  + i + "</td>" +
				"<td>"  + font + data[i].phrase + "</font>" + "</td>" +
				"<td style='text-align:right'>"  + data[i].score + "</td>" +
			"</tr>");
	});

	$(".score-results").empty();
	$(".score-results").html("Total score: " +
			"<b>" + score + "</b>");
	$(".text-results").text(JSON.stringify(text));
}