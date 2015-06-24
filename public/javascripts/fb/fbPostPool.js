function insertUserPost(){
	$('#insertForm').attr('action', '/thirdparty/insert-to-user-post');
	$('#insertForm').submit();
}
function insertDbPageGroupsPost(){
	$('#insertForm').attr('action', '/thirdparty/insertDbPageGroupsPost');
	$('#insertForm').submit();
}
$(document).ready(function(){
	//check all checkbox input
	$('#checkAllCheckbox').click(function() {
        var cbArray = $('#post-pool-table input:checkbox');
        var nLength = cbArray.length;
        for(var i = 0; i < nLength; i++){
            if(!($(cbArray[i]).is(':disabled')))
                $(cbArray[i]).prop('checked', $(this).prop('checked'));
        }
    });

	// Delete
	$('.action-delete-post-pool').click(function(e){
	  	var array_id = [];

		$('#post-pool-table input:checkbox:checked:not(#checkAllCheckbox)').each(function (index){
			var a = $(this).attr('id');
			array_id.push(a);
		});

  		swal(
	  		{
			  	title:"Are you sure?",
			  	text: "You will delete post !",
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
		  			$.get('/thirdparty/delete-post-pool',{
						ids : array_id
					}, function(result){
					});
					swal("Deleted!", "Your post has been deleted.", "success");
					$('#post-pool-table input:checkbox:checked').each(function (index){
						$(this).prop('checked', false);
					});
					location.reload(); 
		  		} else {
			    	swal("Cancelled", "Your post is safe :)", "error");
		  		}
			}
		);
	});

  	//Date time picker
	jQuery(function(){
	   jQuery('#from, #to, #crawled_from, #crawled_to').datetimepicker({
	    format:'Y-m-d',
	    onShow:function( ct ){
		    this.setOptions({
		    })
	    },
	      timepicker:false
	   });
	});

	$("#id_user").select2({
		allowClear: true
	});
}); 
