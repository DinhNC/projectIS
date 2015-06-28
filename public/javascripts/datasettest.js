$('.execute').click(function(){
	var dataset					= $(this).attr('id');
	var profiling_checkbox_id	= 'profiling_' + dataset;
	var profiling				= $('#' + profiling_checkbox_id).is(':checked');

	$.ajax({
		url	:'/sentiment/testSentiment/execute',
		data: {
			dataset		: dataset,
			profiling	: profiling
		},
		success: function(data){
			if(data.result === 'not allow'){
				alert('Could not execute. There is one test running on this dataset.');
			}
			if(!isNaN(data.result)){
				var page = data.result;
				window.location.href= '/sentiment/testSentiment/summary?dataset=' + dataset;
			}
		}
	}).done(function(){
		
	});
});

$('.chagneMention').click(function(e) {
	var id_mention = $(this).attr('id');
	var expected = $('#expected_' + id_mention).html();
	var exception = $('#exception_' + id_mention).html();
	$('#dialogMention').val(id_mention);
	$('#dialogExpected').val(expected);
	$('#dialogException').val(exception);
    $("#modalChange").modal("show");
});

$('#btnEditMention').click(function(e) {
	var id_dataset = $('#dialogDataset').val();
	id_mention = $('#dialogMention').val();
	expected = $('#dialogExpected').val();
	exception = $('#dialogException').val();
	$("#modalChange").modal('hide');
	$.ajax({
		url: '/sentiment/testSentiment/change-mention',
		data: {
			dataset: id_dataset,
			mention: id_mention,
			expected: expected,
			exception: exception
		},
		success: function(data) {
			if (data.result === 'error') {
				alert('Could not update this mention.');
			}
			if (data.result === 'done') {
				$('#expected_' + id_mention).html(expected);
				$('#exception_' + id_mention).html(exception);
				alert('This mention was updated.');
			}
		}
	}).done(function() {

	});
});

$('.resetStatus').click(function(e) {
	var dataset = $(this).attr('dataset');
	$('#dialogDatasetID').val(dataset);
    $("#modalResetStatus").modal("show");
});

$('#resetStatus').click(function(e) {
	var dataset = $('#dialogDatasetID').val();
	$("#modalResetStatus").modal('hide');
	$.ajax({
		url: '/sentiment/testSentiment/reset-dataset',
		data: {
			dataset: dataset
		},
		success: function(data) {
			if (data.result === 'error') {
				alert('Could not reset status of this dataset.');
			} else {
				$('#status_' + dataset).html(data.result);
				alert('This dataset was updated.');
			}
		}
	}).done(function() {

	});
});