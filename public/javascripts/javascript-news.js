$(document).ready(function() {
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
		format:'Y-m-d H:i'
	});
	
	$("#save_article").click(function(event){
		var content = $("div#content").html();
		$("textarea#search_content").val(content);
		$("form#formAddArticle").submit();
	});
});
