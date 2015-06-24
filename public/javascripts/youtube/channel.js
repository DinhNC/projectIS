$(document).ready(function(){
	$('#from').datetimepicker({
		format:'Y-m-d',
		onShow:function( ct ){
			this.setOptions({
				// maxDate:$('#to').val() ? $('#to').val():false
			})
		},
		timepicker:false
	});
	$('#to').datetimepicker({
		format:'Y-m-d',
		onShow:function( ct ){
			this.setOptions({
				// minDate:$('#from').val() ? $('#from').val():false
			})
		},
		timepicker:false
	});
	$("#language, #language_muti_update").select2({
		placeholder: "Select a Language",
		allowClear: true
	});

	// Show modal New
	$('#news_channel').on('shown.bs.modal', function () {
		$("#news_language").select2({
			placeholder: "Select a Language",
			allowClear: true
		});
	});

	// Show modal Edit
	$('#edit_channel').on('shown.bs.modal', function () {
		$("#edit_language").select2({
			placeholder: "Select a Language",
			allowClear: true
		});
	});


	$('.action-edit-channel').click(function(e){
		e.preventDefault();
		var channel = $(this).data("item");

		$('#edit_id').val(channel.id);
		$('#edit_name').val(channel.name);
		$('#edit_thumbnails').val(channel.thumbnails);
		$('#avatar_edit').attr( "src", channel.thumbnails );
		$('#edit_description').val(channel.description);
		$('#edit_fans').val(channel.fans);
		$('#edit_language').val([channel.language]); 
		$('#edit_state').val(channel.video_state);
		if( channel.video_state === 'UPDATING'){
			$('#edit_state').prop('disabled', true);
		} else {
			$('#edit_state').prop('disabled', false);
		}
		$('#edit_categories').val(channel.category_path);
		$('#edit_thumbnails').on('change', function (e) {
		    var valueSelected = this.value;
		    $('#avatar_edit').attr( "src", valueSelected );
		});
	});

	$('#new_thumbnails').on('change', function (e) {
	    var valueSelected = this.value;
	    $('#avatar_new').attr( "src", valueSelected );
	});
}); 