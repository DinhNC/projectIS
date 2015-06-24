$(document).ready(function(){
	$('.action-edit-subject').click(function(e){
		e.preventDefault();
		var subject = $(this).data("item");

		$('#edit_id').val(subject.id);
		$('#edit_name').val(subject.subject);
		$('#edit_type').val(subject.subject_type);
		$('#edit_id_domain').val([subject.id_domain]);
	});

	$('.action-delete-subject').click(function(e){
  		var subject  = $(this).data("item");

  		swal({
		  	title: "Are you sure?",
		  	text: "You will delete subject: " + subject.id + '!',
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
	  			$.get('/subject/delete',{
					id : subject.id
				}, function(result){
				});
				swal("Deleted!", "Your ticket has been deleted.", "success");
				location.reload(); 
	  		} else {
		    	swal("Cancelled", "Your ticket is safe :)", "error");
	  		}
		});
  	});
	
	$('#id_domain').select2({
		placeholder: "Select Domain",
		allowClear: true
	});

	$('#news_subject').on('shown.bs.modal', function () {
		$("#new_id_domain").select2({
			placeholder: "Select Domain",
			allowClear: true
		});
	});
	$('#edit_subject').on('shown.bs.modal', function () {		
		$("#edit_id_domain").select2({
			placeholder: "Select Domain",
			allowClear: true
		});
	});
}); 
