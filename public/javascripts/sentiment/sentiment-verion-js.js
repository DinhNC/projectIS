$( document ).ready(function() {
	$(".headerTitle").html("Sentiment Air - In Development");
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

$(".btn_reset_db").click(function(evt){
	$('#modalReset')
	.on('show.bs.modal', function(e){
	})
	.modal('show');
	resetDBForSentiment();
});

function resetDBForSentiment()
{
	$.ajax({
		url: "/sentiment/reset-db-sentiment",
		data: {},
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
}

function sentimentAnalyze(inputKeyWord, inputDomain, inputTitle, inputContent)
{
	$.ajax({
		url: "/sentiment/simulator-version-js",
		data: {  
			keywords		: inputKeyWord,
			domain			: inputDomain,
			title			: inputTitle,
			content			: inputContent,
			t				: new Date().getTime()
		},
		success: function(results){
			console.log('results: ', results);
			var data		= results;
			var score		= results.score;
			
			setValueResults(results);
			
			var scoreName;
			
			if (score === null)
			{
				scoreName = 'UNRATED';
				$(".results_sentiment").html("<b>" + 'UNRATED' + "</b>");
			}
			else if (score >= 2147483647 )
			{
				scoreName = 'UNKNOWN';
				$(".results_sentiment").html("<b>" + scoreName + "</b>");
			}
			else if(score >= 0.25)
			{
				scoreName = 'POSITIVE';
				$(".results_sentiment").html("<b><font style='color:#69aa46;'>" + scoreName + "</font></b>");
			}
			else if(score <= -0.25)
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

function setValueResults(results)
{
	var data 	= results.sentiment;
	var text 	= getTextResults(results.sentiment);
	var score 	= results.score;
	$("#modalSentiment").modal('hide');			
	$(".results_sentiment").empty();	

	$("#table-results tbody").empty();
	for(var i in data){
		var font	= "<font>";
		console.log('phrases: ', data[i].phrases.length);
		var phrase 	= clasifyPhrase(data[i].phrases);
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
				"<td>"  + font + appendPhrase(phrase) + "</font>" + "</td>" +
				"<td style='text-align:right'>"  + data[i].score + "</td>" +
			"</tr>");
	};

	$(".score-results").empty();
	if( results instanceof Object )
	{
		$(".score-results").html("Total score: " +
				"<b>" + score + "</b>");
	}
	else{
		$(".score-results").html("Total score: " +
				"<b>" + results + "</b>");	
	}
	$(".text-results").text(JSON.stringify(text));
};

function clasifyPhrase(phrase)
{
	var results	= [];
	for(var i = 0; i < phrase.length; i++ )
	{
		results.push({
			'phrase' 	: phrase[i].value,
			'score'		: phrase[i].score
		});
	}

	return results;
};

function appendPhrase (phrase)
{
	var text = '';
	for(var i = 0 ; i < phrase.length; i++)
	{
		text += '<p> /' + phrase[i].phrase + '/ - score: ' + phrase[i].score + '</p>';
	}

	return text;
};

function getTextResults(sentiment)
{
	var results = {};
	for(var i in sentiment)
	{
		results[i] = {
			'score' 	: sentiment[i].score,
			'phrase' 	: clasifyPhrase(sentiment[i].phrases)
		};
	}
	return results;
};