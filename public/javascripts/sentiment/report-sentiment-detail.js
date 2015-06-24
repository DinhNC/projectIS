$( document ).ready(function(){
	
	$('.select-expected-details').editable({
        mode	: 'inline',
        source	: classifySelect($('.select-expected-details').data('all')),
        url 	: '/report/report-management-edit-details',
        title	: 'Expected',
        success: function(response, newValue) {
            if(!response.success) return response.msg;
            // location.reload();
        }
    });

    $('.sentiment-details').click(function(evt){
    	showModalSentimentDetail();
    	var data 	= $(this).data('source');
    	var result 	= JSON.parse(data.sentiment);

    	setValueResults(result);
    });
});

function showModalSentimentDetail()
{
	$('#modalSentimentDetail')
	.on('show.bs.modal', function(e){

	})
	.modal('show');
};

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

	if( !(results instanceof Object) )
	{
		$(".score-results").html("Total score: " +
			"<b><font style='color:#69aa46;'>" + results + "</b>");
	}
	else{

		$(".score-results").html("Total score: " +
				"<b><font style='color:#69aa46;'>" + score + "</b>");
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