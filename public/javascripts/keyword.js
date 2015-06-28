$(document).ready(function(){
	$('.action-edit-keyword').click(function(e){
		e.preventDefault();
		var data = $(this).data("item");
		$('#edit_id').val(data.id);
		$('#edit_keyword').val(data.keyword);
		$('#edit_keyword_google').val(data.keyword_google);
		$('#edit_new_type').val(data.type);
	});
	$('.action-delete-keyword').click(function(e){
  		var keyword  = $(this).data("item");

  		swal({
		  	title: "Are you sure?",
		  	text: "You will delete keyword: " + keyword.id + '!',
		  	type: "warning",
		  	showCancelButton: true,
		  	confirmButtonColor: "#DD6B55",
		  	confirmButtonText: "Yes, delete it!",
		  	cancelButtonText: "No, cancel plx!",
		  	closeOnConfirm: false,
		  	closeOnCancel: false
		},
		function(isConfirm){
	  		if (isConfirm) {
	  			$.get('/keyword/delete',{
					id : keyword.id
				}, function(result){
				});
				swal("Deleted!", "Your keyword has been deleted.", "success");
				location.reload(); 
	  		} else {
		    	swal("Cancelled", "Your keyword is safe :)", "error");
	  		}
		});
  	});
	$('#new_type_select').on('change', function (e) {
	    var optionSelected = $("option:selected", this);
	    var valueSelected = this.value;
	    $('#new_type').val(valueSelected);
	});
	$('#edit_new_type_select').on('change', function (e) {
	    var optionSelected = $("option:selected", this);
	    var valueSelected = this.value;
	    $('#edit_new_type').val(valueSelected);
	});

	$('#type').select2();

	$('#add-more').click(function(e){
		var addKeyWordInput = '<div class="row form-group"><div class="col-sm-3 col-sm-offset-3"><input type="text" class="form-control" placeholder="Facebook" name="keyword[fb]"></div><div class="col-sm-3"><input type="text" class="form-control" placeholder="Google" name="keyword[gg]"></div></div>'
		$('form#new-keyword .first-form-group').after(addKeyWordInput);
	});
}); 
