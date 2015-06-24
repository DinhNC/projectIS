$(document).ready(function(){
	$("#topicId").select2({
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
	jQuery(function(){
   		jQuery('#from, #to').datetimepicker({
	    	format:'Y-m-d',
	    	onShow:function( ct ){
		     	this.setOptions({
		     	})
	    	},
	      	timepicker:false
   		});
  	});
});