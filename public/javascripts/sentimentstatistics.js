
$('.table_sentimentStaistics .action').click(function(evt){
	var $parentRow		= $(this).closest('tr');
	var idTopic			= $parentRow.data('id');
	var idMention		= $parentRow.data('mention');
	
	$('#modalSentiment')
	.on('show.bs.modal', function(e){
	})
	.modal('show');
	
	if( $(this).data('action') === 'sentimentAction' )
	{
		sentimentSimulator(idTopic, idMention);
	}

});

function sentimentSimulator(idTopic, idMention)
{
	$.ajax({
		url: "/sentiment/statistics/sentiment-simulator",
		data: {  
			idTopic			:	idTopic,
			idMention		:	idMention
		},
		success: function(data){
			$('#mention_text').html(data.doc);
			$('#mention_sentiment').text(data.simulate);
		},
		error: function(){
			
		}
	}).done(function() {
		console.log('reload pages');
	});
}