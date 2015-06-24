function fbAccountCleanForm(){
	var proxy = $("#recommendProxy").val();
	var arrayType = new Array("input","textarea");
	for(var i=0;i<arrayType.length;i++) {
		var id = document.getElementsByTagName(arrayType[i]);
		for(var j=0;j<id.length;j++) {
			if(arrayType[i]=='input') {
				if(id[j].getAttribute('type')=='text') {
					id[j].value = "";
				}
			}
			else {
				id[j].value = "";	
			}
		}
	}

	$("#recommendProxy").val(proxy);
	$("#proxy").val(proxy);
};

Date.prototype.toStringMySQLFormat = function()
{
  return this.getUTCFullYear() + '-' +
          ('00' + (this.getUTCMonth()+1)).slice(-2) + '-' +
          ('00' + this.getUTCDate()).slice(-2) + ' ' + 
          ('00' + this.getUTCHours()).slice(-2) + ':' + 
          ('00' + this.getUTCMinutes()).slice(-2) + ':' + 
          ('00' + this.getUTCSeconds()).slice(-2);
};

$(document).ready(function(){
	// Delete
	$('.action-delete-account').click(function(e){
	  	var array_id = [];

		$('input:checkbox:checked:not(#checkAll)').each(function (index){
			var a = $(this).val();
			array_id.push(a);
		});

  		swal(
	  		{
			  	title:"Are you sure?",
			  	text: "You will delete account: " + array_id + '!',
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
		  			$.get('/fb-account2/delete-account',{
						ids : array_id
					}, function(result){
					});
					swal("Deleted!", "Your account has been deleted.", "success");
					location.reload(); 
		  		} else {
			    	swal("Cancelled", "Your account is safe :)", "error");
		  		}
			}
		);
	});

	$('.action-edit-account').click(function(e){
		var row = $(this).data("item");

		$('#edit_id').val(row.id);
		$('#edit_id_social').val(row.id_social);
		$('#edit_username').val(row.username);
		$('#edit_password').val(row.password);
		$('#edit_mobile').val(row.mobile);
		$('#edit_email').val(row.email);
		$('#edit_proxy').val(row.proxy);
		$('#edit_status').val(row.status);
		$('#edit_is_training').val(row.is_training);
		if( row.notes ) {
			$('#edit_notes').val(row.notes.split(','));
		} else {
			$('#edit_notes').val('');	
		}
		$('#edit_train_to').val(new Date(row.train_to).toStringMySQLFormat());
	});

	$('.action-view-log').click(function(e){
		var row = $(this).data("item");

		$('#log_id').val(row.id);
		$('#edit_log').val(row.log);
	});

	//Date time picker
	jQuery(function(){
	   jQuery('#train_to, #edit_train_to').datetimepicker({
	    format:'Y-m-d',
	    onShow:function( ct ){
		    this.setOptions({
		    })
	    },
	      timepicker:false
	   });
	});
});