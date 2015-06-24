Date.prototype.toDateMySQLFormat = function()
{
    return this.getUTCFullYear() + '-' +
                ('00' + (this.getUTCMonth()+1)).slice(-2) + '-' +
                ('00' + this.getUTCDate()).slice(-2);
};
$(document).ready(function(){
	$("#requester, #assignee").select2({
		allowClear: true
	});
	// Show modal New
	$('#edit').on('shown.bs.modal', function () {
		$("#edit_id_topic").select2({
			placeholder: "Select a Topic",
			allowClear: true
		});
		$("#edit_assignee").select2({
			allowClear: true,
			placeholder: "Select Assignee",
		});
		$("#edit_id_project").select2({
			allowClear: true,
			placeholder: "Select Assignee",
		});
	});


	$('.action-edit-ticket').click(function(e){
      	var ticket  = $(this).data("item");

      	$('#edit_id').val(ticket.id);
      	$('#edit_ticket_for').val(ticket.ticket_for);

		$('#edit_id_topic').val([ticket.id_target]);
		$('#edit_id_project').val([ticket.id_target]);
		$('#edit_assignee').val([ticket.id_assignee]);
		$('#edit_priority').val(ticket.priority);
		$('#edit_state').val(ticket.state);
		$('#edit_type').val(ticket.type);
		$('#edit_link').val(ticket.content_links);
		$('#edit_reason').val(ticket.reason);
		$('#edit_deadline').val(new Date(ticket.deadline).toDateMySQLFormat());
		$('#edit_from').val(new Date(ticket.content_from).toDateMySQLFormat());
		$('#edit_to').val(new Date(ticket.content_to).toDateMySQLFormat());

		$( "#edit_type" ).change(function () {
			var str = "";
			$( "#edit_type option:selected" ).each(function() {
				str += $(this).text();

				if( str == 'COPY_DATA')
				{
					$('#form-group-link').hide();
					$('#form-group-time').show();
				}
				else
					if( str == 'COPY_MENTIONS')
					{
						$('#form-group-time').hide();
						$('#form-group-link').show();
					}
					else
					{
						$('#form-group-time').hide();
						$('#form-group-link').hide();
					}
			});
		}).change();

		if( ticket.ticket_for == 'TOPIC')
		{
			$('#form-group-topic').show();
			$('#form-group-project').hide();
		}
		else
		{
			$('#form-group-topic').hide();
			$('#form-group-project').show();
		}
  	});
  	$('#edit_from, #edit_to').datetimepicker({
		format:'Y-m-d',
		onShow:function( ct ){
	 		this.setOptions({
	 		})
	    },
      	timepicker:false
   	});
  	$('#edit_deadline').datetimepicker({
		format:'Y-m-d',
		onShow:function( ct ){
	 		this.setOptions({
	 			minDate:0 //Today
	 		})
	    },
      	timepicker:false
   	});
  	$('.action-delete-ticket').click(function(e){
  		var ticket  = $(this).data("item");

  		swal({
		  	title: "Are you sure?",
		  	text: "You will delete ticket: " + ticket.id + '!',
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
	  			$.get('/ticket/delete',{
					id : ticket.id
				}, function(result){
				});
				swal("Deleted!", "Your ticket has been deleted.", "success");
				location.reload(); 
	  		} else {
		    	swal("Cancelled", "Your ticket is safe :)", "error");
	  		}
		});
  	});
});


