$(document).ready(function(){
	$("#gr-topic").hide();
	$("#gr-topic-2").hide();

    $("#id_subject").select2({
    	placeholder: "Select a Subject",
		allowClear: true,
    	ajax: {
			delay: 250,
			dataType: 'json',
			url: '/subject/search',

			data: function (params) {
				var queryParameters = {
					q: params.term
				}
				return queryParameters;
			},
			processResults: function (data) {
				return {
					results: data
				};
			}
		},
		minimumInputLength : 2,
	});

	
	$( "#alias_type" ).change(function () {
		$( "#alias_type option:selected" ).each(function() {
			if( $(this).text() == "USER_DEFINED")
			{
				$("#gr-topic").show();
			}
			else
			{
				$("#gr-topic").hide();
			}
		});
	}).change();

	$( "#edit_type" ).change(function () {
		$( "#edit_type option:selected" ).each(function() {
			if( $(this).text() == "USER_DEFINED")
			{
				$("#gr-topic-2").show();
			}
			else
			{
				$("#gr-topic-2").hide();
			}
		});
	}).change();

	$('.action-edit-alias').click(function(e){
		e.preventDefault();
		var alias = $(this).data("item");

		$('#edit_id').val(alias.id);
		$('#edit_id_subject').val([alias.id_subject]);
		$('#edit_name').val(alias.alias);
		$('#edit_type').val(alias.alias_type);
		$('#edit_id_topic').val([alias.id_defined_topic]);
	});

	$('#edit_alias').on('shown.bs.modal', function () {
		$("#gr-topic-2").hide();

		$("#edit_id_topic").select2({
			placeholder: "Select a topic",
			allowClear: true
		});
		
		$("#edit_id_subject").select2({
	    	placeholder: "Select a Subject",
			allowClear: true,
	    	ajax: {
				delay: 250,
				dataType: 'json',
				url: '/subject/search',

				data: function (params) {
					var queryParameters = {
						q: params.term
					}
					return queryParameters;
				},
				processResults: function (data) {
					return {
						results: data
					};
				}
			},
			minimumInputLength : 2
		});
	});

	$('#news_alias').on('shown.bs.modal', function () {
		$("#news_id_topic").select2({
			placeholder: "Select a topic",
			allowClear: true
		});

		$("#news_subject").select2({
	    	placeholder: "Select a Subject",
			allowClear: true,
	    	ajax: {
				delay: 250,
				dataType: 'json',
				url: '/subject/search',

				data: function (params) {
					var queryParameters = {
						q: params.term
					}
					return queryParameters;
				},
				processResults: function (data) {
					return {
						results: data
					};
				}
			},
			minimumInputLength : 2
		});
	});

	$('.action-delete-alias').click(function(e){
  		var alias  = $(this).data("item");

  		swal({
		  	title: "Are you sure?",
		  	text: "You will delete alias: " + alias.id + '!',
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
	  			$.get('/alias/delete',{
					id : alias.id
				}, function(result){
				});
				swal("Deleted!", "Your alias has been deleted.", "success");
				location.reload(); 
	  		} else {
		    	swal("Cancelled", "Your alias is safe :)", "error");
	  		}
		});
  	});
}); 
