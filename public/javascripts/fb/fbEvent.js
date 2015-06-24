Date.prototype.toStringMySQLFormat = function(withoutSecond)
{
    var str = this.getUTCFullYear() + '-' +
        ('00' + (this.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + this.getUTCDate()).slice(-2) + ' ' + 
        ('00' + this.getUTCHours()).slice(-2) + ':' + 
        ('00' + this.getUTCMinutes()).slice(-2);

    if( !withoutSecond )
    {
        str += (':' + ('00' + this.getUTCSeconds()).slice(-2));
    }
    return str;
};

$(document).ready(function(){
  	$('.action-edit').click(function(e){
  		e.preventDefault();
		var data = $(this).data("item");
		$('#edit_id').val(data.id);
		$('#edit_name').val(data.name);
		$('#edit_description').val(data.description);
		$('#edit_state').val(data.post_state);
		$('#edit_status').val(data.post_status);
		if(data.post_updated_at)
			$('#edit_updated_at').val(new Date(data.post_updated_at*1000).toStringMySQLFormat(true));
		else
			$('#edit_updated_at').val(null);
		if(data.post_last_data)
			$('#edit_last_post').val(new Date(data.post_last_data*1000).toStringMySQLFormat(true));
		else
			$('#edit_last_post').val(null);
		$('#edit_category').val(data.category_path);
	});
  	$('#edit_updated_at, #edit_last_post').datetimepicker({
		format:'Y-m-d H:i',
		onShow:function( ct ){
			this.setOptions({
			})
		},
			timepicker:false
	});
	$('#from, #to').datetimepicker({
		format		:'Y-m-d',
		onShow:function( ct ){
			this.setOptions({
			})
		},
		timepicker:false
	});

  	$('.action-delete-content').click(function(e){
  		var content  = $(this).data("item");

  		swal({
		  	title: "Are you sure?",
		  	text: "You will delete content: " + content.id + '!',
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
	  			$.get('/fb-content/delete',{
					id : content.id
				}, function(result){
				});
				swal("Deleted!", "Your content has been deleted.", "success");
				location.reload(); 
	  		} else {
		    	swal("Cancelled", "Your content is safe :)", "error");
	  		}
		});
  	});
  	$('.action-delete').click(function(e){
  		var id = $(this).data('item').id;
  		swal({
		  	title: "Are you sure?",
		  	text: "You will delete event: " + id + '!',
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
	  			$.get('/fb-events/delete',{
					id : id
				}, function(result){
				});
				swal("Deleted!", "Your event has been deleted.", "success");
				location.reload();
	  		} else {
		    	swal("Cancelled", "Your event is safe :)", "error");
	  		}
		});
  	});
  	//add new event
  // 	$('#new_id_social').change(function(){
  // 		var id_social 	= $(this).val(); 

  // 		FB.api('/'+id_social, {
		// 'access_token' : 'CAACEdEose0cBAJAISmMu1mtIswiM0wU8ZB1mZAWTKHqddJgWwSnekAKV7juLFh6PiiK6gQCuP9RoNQXNegYKd5ZBWoT9p8lhz31QZB2LKVJZBoZBejm4ZBM5KnZA8OEiMsYlFktoy8RtN2cKLBq1ldB4HBt2oTa5MMAPiJaVBo0Q8O7FK7ZBpg2BubLGurfEDZCWN5waqkFXYdOOhDIgP7zFSg'
		// },function(response){
		// 	if( response )
		// 	{
		// 		console.log('response: ', response);
		// 		$('#new_id_ower').val(response.owner.id);
		// 		$('#new_name').val(response.name);
		// 		$('#new_description').val(response.description);
		// 	}
		// 	else
		// 	{
		// 		console.log('khong tim thay!');
		// 	}
		// });
  // 	});
}); 
