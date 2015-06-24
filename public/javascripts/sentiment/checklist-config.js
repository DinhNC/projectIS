$( document ).ready(function(){
	$('.action-delete-checklist').click(function(e){
  		var checklist  = $(this).data("item");

  		swal({
		  	title: "Are you sure?",
		  	text: "You will delete checklist: " + checklist.id + '!',
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
	  			$.get('/checklist/delete',{
					id : checklist.id
				}, function(result){
				});
				swal("Deleted!", "Your checklist has been deleted.", "success");
				location.reload(); 
	  		} else {
		    	swal("Cancelled", "Your checklist is safe :)", "error");
	  		}
		});
  	});

	$('.action-edit-checklist').click(function(e){
		e.preventDefault();
		var data = $(this).data("item");

		$('#id').val(data.id);
		$('#checklist').val(data.checklist);
		$('#script_path').val(data.script_path);
		$('#schedule').val(data.schedule);
		$('#log_level').val(data.log_level);

		$('#sms').prop('checked', false);
		$('#email').prop('checked', false);
		var arr = data.notification.split(',');
		for(var i=0; i<arr.length; i++)
		{
			if(arr[i] == 'SMS')
				$('#sms').prop('checked', true);
			if(arr[i] == 'EMAIL')
				$('#email').prop('checked', true);
		} 
	});
});

