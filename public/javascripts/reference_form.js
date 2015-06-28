$('.action-edit').click(function(e){
	e.preventDefault();
	var row = $(this).data("item");

	$(edit_id_social).val(row.id_social);
	$(edit_access_token).val(row.access_token);
	$(edit_token_type).val(row.token_type);
	$(edit_accepted_languages).val(row.accepted_languages);
	$(edit_status).val(row.status);
	$(edit_created_at).val(row.created_at);

	$(edit_id_social_cur).val(row.id_social);
});

$('.action-delete').click(function(e){
	e.preventDefault();
	var row = $(this).data("item");

	$('#id_social_delete').text('Id Social: ' + row.id_social);
	$('.id_social_delete').val(row.id_social);
	$('#token_type_delete').text('Type: ' + row.token_type);
	$('#access_type_delete').text('Access Token: ' + row.access_token);
	$('#created_at_delete').text('Created At: ' + row.created_at);
	$('#status_delete').text('Status: ' + row.status);
	$('#accepted_languages_delete').text('Accepted Languages: ' + row.accepted_languages);
});

$("#checkAll").click(function(){
    $('input:checkbox').not(this).prop('checked', this.checked);
});

$('#delete_mutiline').click(function(e){
	e.preventDefault();
	var array_id_social = [];

	$('input:checkbox:checked:not(#checkAll)').each(function (index){
		var a = $(this).data("item").id_social;
		array_id_social.push(a);
	});

	$('#arr_text_delete').text('Delete reference: ')

	for( var i =0; i < array_id_social.length; i++){
		$('#arr_text_delete').text($('#arr_text_delete').text() + ' Id Social = ' + array_id_social[i]);
	}

	$('#arr_id_social_delete').val(array_id_social);
});

$('.action-check-token').click(function(e){
	var item = $(this).data('item');
	$.get('/fb-reference/check_token',{
		token : item.access_token
	}, function(result){
		if( result )
		{
			alert('Token is valid');
		}
		else
		{
			alert('Token is invalid');
		}
	});
});