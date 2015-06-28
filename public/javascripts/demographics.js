$(document).ready(function(){
	$("#source").select2({
		allowClear: true,
		placeholder: "Select a Source",
	});
	$("#location").select2({
		allowClear: true,
		placeholder: "Select a Location",
	});

	// Show modal New
	$('#news_demographics').on('shown.bs.modal', function () {
		if( $(this).data('select2IsCalled') ) {
			return;
		}
		$(this).data('select2IsCalled', 1);

		$("#new_source").select2({
			placeholder: "Select a Source",
			allowClear: true
		});
		$("#new_location").select2({
			allowClear: true,
			placeholder: "Select Location",
		});
	});

	// Show modal Edit
	$('#edit_demographics').on('shown.bs.modal', function () {
		$("#edit_location").select2({
			allowClear: true,
			placeholder: "Select Location",
		});
	});

	$('.action-edit-demographics').click(function(e){
			var row         = $(this).data("item");
			$('#edit_id_source').val(row.id_source);
			$('#edit_identity').val(row.identity);
			$('#edit_name').val(row.fullname);
			$('#edit_birthday').val(row.birthday_year);
			$('#edit_location').val([row.id_city]);
			if(row.gender == 'MALE'){
				$('#edit_gender_1').prop('checked', true);
			}
			else
				if(row.gender == 'FEMALE')
				{
					$('#edit_gender_2').prop('checked', true);
				}
				else
				{
					$('#edit_gender_2').prop('checked', false);
					$('#edit_gender_1').prop('checked', false);
				}
	});
	$('.action-edit-work').click(function(e){
			var data         = $(this).data("item");
			$('#work_id').val(data.id_work_social);
			$('#work_company').val(data.company_name);
			$('#work_position').val(data.position);
			$('#work_level').val(data.level);
	});
	$('.action-edit-edu').click(function(e){
			var data      = $(this).data("item");
			$('#edu_id').val(data.id_edu_social);
			$('#edu_name').val(data.edu_name);
			$('#edu_description').val(data.description);
			$('#edu_level').val(data.level);
	});
	$('.action-add-work').click(function(e){
			var row      = $(this).data("item");
			$('#work_id_user').val(row.id);
			$('#work_identity').val(row.identity);
	});
	$('.action-add-edu').click(function(e){
			var row      = $(this).data("item");
			$('#edu_id_user').val(row.id);
			$('#edu_identity').val(row.identity);
	});
});
