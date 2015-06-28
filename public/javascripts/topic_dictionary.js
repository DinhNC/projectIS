$("#selectDomain").change(function(evt){
	var idDomain = $(this).val();
	changeTopicList(idDomain);
});

$("#add-row").click(function(evt){
	var topic = $("#selectTopic").val();
	var domain = $("#selectDomain").val();
	changeTopicListAddRow(domain, topic);
});

function changeTopicListAddRow(idDomain, topic)
{
	$.ajax({
		url	:'/sentiment/topiclist',
		data: {
			domain: idDomain
		},
		success: function(data){
			var topics = data.topics;
			
			$("#select_topic_addRow").empty();
			$("#select_topic_addRow").append("<option value='0'>All Topics</option>");
			$(topics).each(function(i){				
				$("#select_topic_addRow").append('<option value="'+topics[i].id + '">' + topics[i].id + ' - ' + topics[i].name + '</option>');		
				if (parseInt(topic) === topics[i].id) 
				{
					$("#select_topic_addRow").append('<option selected="selected", value="'+topics[i].id + '">' + topics[i].id + ' - ' + topics[i].name + '</option>');
				}
			});			
		}
	}).done(function(){
		console.log("reload page");
	});
}

function changeTopicList(idDomain)
{
	$.ajax({
		url	:'/sentiment/topiclist',
		data: {
			domain: idDomain
		},
		success: function(data){
			var topics = data.topics;
			$("#selectTopic").empty();
			$("#selectTopic").append("<option value='0'>All Topics</option>");
			$(topics).each(function(i){
				$("#selectTopic").append('<option value="'+topics[i].id + '">' + topics[i].id + ' - ' + topics[i].name + '</option>');
			});			
		}
	}).done(function(){
		console.log("reload page");
	});
}

