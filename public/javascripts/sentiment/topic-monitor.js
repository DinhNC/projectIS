Date.prototype.toStringMySQLFormat = function()
{
  return this.getUTCFullYear() + '-' +
          ('00' + (this.getUTCMonth()+1)).slice(-2) + '-' +
          ('00' + this.getUTCDate()).slice(-2) + ' ' + 
          ('00' + this.getUTCHours()).slice(-2) + ':' + 
          ('00' + this.getUTCMinutes()).slice(-2) + ':' + 
          ('00' + this.getUTCSeconds()).slice(-2);
};

$( document ).ready(function(){
	// $(".select-domain").change(function(evt){
	// 	var id_domain = $(this).val();
	// 	changeTopicList(id_domain);
	// });
	$(".id_topic").select2({
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

	$('.from-date, .to-date').datetimepicker({
		format:'Y-m-d',
		onShow:function( ct )
		{
			this.setOptions({
			})
		},
		timepicker:false
	});

	$('.is-active').editable({
        source: [
            {value: 1, text: 'Favourite'},
            {value: 0, text: 'Not Favourite'}
        ],
        mode	: 'inline',
        url 	: '/sentiment/topicmonitor/is_active',
        title	: 'Edit row',
        success: function(response, newValue) {
            if(!response.success) return response.msg;
            location.reload();
        }
    });

	function changeTopicList(idDomain)
	{
		$.ajax({
			url	:'/sentiment/topicmonitor/topiclist',
			data: {
				domain: idDomain
			},
			success: function(data){
				var topics = data.topics;
				$(".select-topic").empty();
				$(".select-topic").append("<option value=''>--Select One--</option>");
				$(topics).each(function(i){
					$(".select-topic").append('<option value="'+topics[i].id + '">' + topics[i].id + ' - ' + topics[i].name + '</option>');
				});			
			}
		}).done(function(){
			console.log("reload page");
		});
	}

});

