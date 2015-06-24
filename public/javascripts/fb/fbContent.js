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
  	$('.action-edit-content').click(function(e){
  		e.preventDefault();
		var data = $(this).data("item");
		$('#edit_id').val(data.id);
		$('#edit_message').val(data.message);
		$('#edit_photo').val(data.photo);
		$('#edit_type').val(data.type);
		if(data.created_at)
			$('#edit_date').val(new Date(data.created_at*1000).toStringMySQLFormat(true));
		else
			$('#edit_date').val(null);
	});
  	$('#edit_date').datetimepicker({
		format:'Y-m-d H:i',
		onShow:function( ct ){
			this.setOptions({
			})
		},
			timepicker:true
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
}); 
