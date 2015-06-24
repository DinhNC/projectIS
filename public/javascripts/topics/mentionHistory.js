Date.prototype.toStringMySQLFormat = function()
{
  return this.getUTCFullYear() + '-' +
          ('00' + (this.getUTCMonth()+1)).slice(-2) + '-' +
          ('00' + this.getUTCDate()).slice(-2) + ' ' + 
          ('00' + this.getUTCHours()).slice(-2) + ':' + 
          ('00' + this.getUTCMinutes()).slice(-2) + ':' + 
          ('00' + this.getUTCSeconds()).slice(-2);
};
$( document ).ready(function() {
	
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

	$("#id_user").select2({
    	ajax: {
			delay: 250,
			dataType: 'json',
			url: '/history/search-user',

			data: function (params) {
				var queryParameters = {
					q: params.term
				}
				return queryParameters;
			},
			processResults: function (data) {
				console.log('data: ', data);
				return {
					results: data
				};
			}
		},
		minimumInputLength : 2,
		placeholder: "Select a User",
		allowClear: true
	});

	$("#action").select2({
		placeholder: "Select a Action",
		allowClear: true
	});
	$("#type").select2({
		placeholder: "Select a Type",
		allowClear: true
	});

	$('#from, #to').datetimepicker({
		format:'Y-m-d',
		onShow:function( ct )
		{
			this.setOptions({
			})
		},
		timepicker:false
	});

    //xu ly ajax  view mention
    $('.view-mention').click(function(){
    	var data = $(this).data("item");

    	$('.btn-report').on('click', function(evt){
    		if( data.action === 'SENTIMENT' )
    		{
    			reportSentiment(data);
    		}
    		else{
    			alert('Chức năng chỉ hổ trợ report sentiment!');
    		}
    	});

		$.get('/history/view-mention',{
			id_topic 	: data.id_topic,
			id_mention 	: data.id_mention
		}, function(result){

			if( result.url )
			{
				$('#title-mention').html('<a href="'+result.url+'">' + result.url + '</a>');
			}
			if( result.search_text )
			{
				$('#text-mention').html(result.search_text);
			}
			else
			{
				$('#text-mention').html('<em>Mention not found!</em>');
			}
		});
    });

    //count data 
    $("#show-result").click(function(e){
        e.preventDefault();
        $(this).append("<img src='/images/pacman.gif' width='20px' />")
        $.get('/history/count'+location.search, function(data){
            var result  = $("#show-result").data('result') | 0;
            var params  = $("#show-result").data('params') || {};
            var limit   = params.limit;
            var from    = params.page * limit;
            var to      = from + result;
            $("#count-result").text("Show " + result + " result(s) from " + from + " to " + to + " of total " + data.count + " row(s)");
        })
        return false;
    });

    function reportSentiment(doc)
    {
    	var data  	= {
			'type' 			: 'SENTIMENT',
			'label'			: 'HISTORY',
			'id_mention'	: doc.id_mention,
			'id_topic'		: doc.id_topic,
			'id_user'		: -1
		};
    	$.ajax({
			url 	: '/report/insert-report',
			data 	:  {
				'data' 			: data
			},
			success : function(results){
				location.reload();
			},
			error  	: function(error)
			{
				alert('Report Error - ' + error.toString());
			}
		}).done(function(){
			console.log('reloads !');
		});
    };
});