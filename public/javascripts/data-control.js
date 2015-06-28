$(document).ready(function(){
	// $(".headerTitle").html("Information Retrieval Social Media");

	var row 	= null;
	$('.add_keyword').click(function(evt)
	{
		row 		= $(this).data('source');

		$('.keyword-input').empty();
		// $('.keyword-input').val(row.keywords);

		$("#modelAddKeyword")
		.on('show.bs.modal', function(e){

		})
		.modal('show');
	});

	$('.keywords-submit').click(function(evt){
		
		var keywords 	= $('.keyword-input').val();
		saveKeyword(keywords, row.id);
	});

});

function saveKeyword(keywords, id)
{
	$.ajax({
		url: "/dataset/add-keyword",
		data: {
			keywords 	: keywords,
			id			: id,
			t 			: new Date().getTime()
		},
		success: function(results){
			if( results.success )
			{
				$("#modelAddKeyword").modal('hide');
				location.reload();
				// setValueResults(results);
				// $("#modalReset").modal('hide');	
			}
			else{
				// alert('Error!');
				location.reload();
			}
		},
		error: function(err){
			console.log("err", err);
		}
	}).done(function() {
		console.log('reload pages');
	});
};
