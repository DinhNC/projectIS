$(document).ready(function(){
	$("#id_topic").select2({
		ajax: {
			delay: 250,
			dataType: 'json',
			url: '/topics/search',

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
		placeholder: "Select a Topic",
		allowClear: true
	});
});