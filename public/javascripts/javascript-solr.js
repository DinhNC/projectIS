function showFieldSearch()
{	
	var type = $('#type').val();
	if( !type )
	{
		return;
	}
	if(type.indexOf('master') !== -1){
		$("#row_shard").removeClass("hidden").show();
		$("#row_topic").hide();
		$("#row_shard").addClass("editmention-top");
	} else if(type.indexOf('topic') !== -1){
		$("#row_shard").removeClass("editmention-top").addClass("hidden");
		$("#row_topic").removeClass("hidden").show();
		$("#row_topic").addClass("editmention-top");
	}
	if(type.length === 0) {
		$("#row_topic").addClass("hidden");
		$("#row_shard").addClass("hidden");
	}
};

$("#load_solr").click(function(event){
	var type		= $('#type').val();
	var idmention	= $('#idmention').val();
	var shard		= $('#shard').val();
	var idtopic		= $('#idtopic').val();
	
	if( !type || !idmention || (!idtopic && !shard))
	{
		return;
	}

	$.ajax({
		url	:'/cm/load',
		data: {
			type		: type,
			idmention	: idmention,
			idtopic		: idtopic,
			shard		: shard
		},
		beforeSend: function( xhr ) {
			$("div.loading-edit").removeClass("hidden").show();
		},
		success: function(data){
			$("div.loading-edit").addClass("hidden");
			attributesSelect(data);
		}
	}).done(function(){
		console.log("reload page");
	});
});

function attributesSelect(data)
{	
	if(!data[0]) {
		return;
	}
	if(data[0].message) {
		$("#message-ajax").removeClass("hidden").show();
		$("#text-message").text(data[0].message);
	} else {
		var title = data[0].search_text[1] ? data[0].search_text[0] : '';
		var content = data[0].search_text[1] ? data[0].search_text[1] : data[0].search_text[0];
		var views = data[0].views ? data[0].views : '';
		var likes = data[0].likes ? data[0].likes : '';
		var comments = data[0].comments ? data[0].comments : '';
		var shares = data[0].shares ? data[0].shares : '';
		$("#message-ajax").addClass("hidden");
		$("#text-message").text('');
		$("#updated_at").val(data[0].updated_at);
		$("#created_date").val(data[0].created_date);
		$("#search_title").val(title);
		$("#search_content").val(content);
		$("#content").html(content);
		$("#views").val(views);
		$("#likes").val(likes);
		$("#comments").val(comments);
		$("#shares").val(shares);
	}
	$("html, body").animate({ scrollTop: 0 }, "slow");
}

$(document).ready(function() {
	$('#updated_at').datetimepicker({
		lang:'de',
		i18n:{
		 de:{
		  months:[
		   'Januar','Februar','März','April',
		   'Mai','Juni','Juli','August',
		   'September','Oktober','November','Dezember'
		  ],
		  dayOfWeek:[
		   "So.", "Mo", "Di", "Mi", 
		   "Do", "Fr", "Sa."
		  ]
		 }
		},
		timepicker:false,
		format:'Y-m-d'
   });

	$('#created_date').datetimepicker({
		lang:'de',
		i18n:{
		 de:{
		  months:[
		   'Januar','Februar','März','April',
		   'Mai','Juni','Juli','August',
		   'September','Oktober','November','Dezember'
		  ],
		  dayOfWeek:[
		   "So.", "Mo", "Di", "Mi", 
		   "Do", "Fr", "Sa."
		  ]
		 }
		},
		timepicker:false,
		format:'Y-m-d'
	});
	var type = $('#type').val();
	if( !type )
	{
		return;
	}
	if(type && type.indexOf('master') !== -1){
		$("#row_shard").removeClass("hidden").show();
		$("#row_topic").hide();
		$("#row_shard").addClass("editmention-top");
	} else if(type && type.indexOf('topic') !== -1){
		$("#row_shard").removeClass("editmention-top").addClass("hidden");
		$("#row_topic").removeClass("hidden").show();
		$("#row_topic").addClass("editmention-top");
	}
	if(type.length === 0) {
		$("#row_topic").addClass("hidden");
		$("#row_shard").addClass("hidden");
	}
	
});
