$('.action-edit').click(function(e){
	var row = $(this).data("item");
	$('#edit_token_id').val(row.id);
	$('#edit_app_id').val(row.app_id);
	$('#edit_access_token').val(row.access_token);
	$('#edit_token_type').val(row.token_type);
	$('#edit_state').val(row.state);
	$('#edit_checking').val(row.checking || 'NONE');
});

$('.action-delete').click(function(e){
	var row = $(this).data("item");

	$('#app_id_delete').text('App id: ' + row.id);
	$('.token_id_delete').val(row.app_id);
	$('#token_type_delete').text('Type: ' + row.token_type);
	$('#access_type_delete').text('Access Token: ' + row.access_token);
	$('#state_delete').text('State: ' + row.state);
	$('#checking_delete').text('Checking: ' + row.checking);
});

