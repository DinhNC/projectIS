$(document).ready(function(){
  	$('.action-edit-category').click(function(e){
  		e.preventDefault();
		var data = $(this).data("item");
		$('#edit_id').val(data.id);
		$('#edit_id_parent').val(data.id_parent);
		$('#edit_name').val(data.name);
	});
	$('.action-delete-category').click(function(e){
		e.preventDefault();
		var data = $(this).data("item");
		$('#id-delete-text').text(data.id);
		$('#id-delete').val(data.id);
	});
}); 
