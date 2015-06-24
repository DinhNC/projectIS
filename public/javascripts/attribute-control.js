
$(document).ready(function(){
	$("#idBarProgress").hide();
	$(".td-search_text").attr("style = width:60px;");
//	$("#idpushtosolr").attr("disabled", "disabled");
});
			
$("#idDomain").click(function(evt){
	var idDomain = $(this).val();
	sentIdDomain(idDomain);
});

$("#fromDate").click(function(evt){
	$(".form_datetime").datepicker({
		format: "dd MM yyyy - hh:ii"
	});
});

$("#idTopics").click(function(evt){
	var id_topic	= $(this).val();
	tagsOfTopic(id_topic);
});

function tagsOfTopic(id_topic)
{
	$.ajax({
		url	:'/sentiment/tags-of-topic',
		data: {
			id_topic: id_topic
		},
		success: function(data){
			
		}
	}).done(function(){
		console.log("reload page");
	});
}

function sentIdDomain(idDomain)
{
	$.ajax({
		url	:'/sentiment/attributes-with-domain',
		data: {
			idDomain: idDomain
		},
		success: function(data){
			
			attributesSelect(data.attribute);
			topicsSelect(data.dataTopics);
		}
	}).done(function(){
		console.log("reload page");
	});
}

function topicsSelect(topics)
{
	console.log(topics);
	$("#idTopics").empty();
	$("#idTopics").append("<option>--Select Topic--</option>");
	
	$(topics).each(function(i){
		$("#idTopics").append('<option value="'+topics[i].id + '">' + topics[i].id + " -- " + topics[i].name + '</option>');
	});
}

function attributesSelect(data)
{	
	$("#idAttribute").empty();
	$("#idAttribute").append("<option>--Select--</option>");
	
	$(data).each(function(i){
		$("#idAttribute").append('<option value="'+data[i].attributes + '">' + data[i].attributes + '</option>');
	});
}

$(".edit").click(function(evt){
	var $parentRow		= $(this).closest('tr');
	var data			= $parentRow.data();
	var attribute		= $("#idAttribute").val();
	
	$(".table_EditScore").val(data.mentionid);
	$(".table_EditScore").find("#id_box").html(data.id);
//	$(".table_EditScore").find("#mention").html(data.mention);
	$(".table_EditScore").find("#attribute_box").html(attribute);
	for(var i = 0; i < data.attributes.length; i++)
	{
		var attribute_data = data.attributes[i];
		if(attribute_data === attribute + ' Negative')
		{
			$(".table_EditScore").find("#idNegative_box").prop('checked', true);
		}
		if(attribute_data === attribute + ' Positive')
		{
			$(".table_EditScore").find("#idPositive_box").prop('checked', true);
		}
		if(attribute_data === attribute + ' Neutral')
		{
			$(".table_EditScore").find("#idNeutral_box").prop('checked', true);
		}
	}
	
	$("#ModalSelectEditScore")
	.on('show.bs.modal', function(e){
       
    })
    .modal("show");
	
	$("#btnSave").click(function(evt){
		var id					= data.id;
		var topic_id			= $("#idTopics").val();
		var sentiments			= [];
		$('.table_EditScore').find("#value_box input:checked").each(function(){
		   sentiments.push($(this).val());
		});
		edit_attribute(topic_id, id, attribute, sentiments, data.attributes);
	});
	
});

function edit_attribute(topic_id, id, attribute, sentiments, delete_attribute)
{
	$.ajax({
		url: "/sentiment/edit-attributes",
		data: {
			topic_id		: topic_id,
			mention_id		:	id,
			attribute		:	attribute,
			sentiments		:	sentiments,
			delete_attr		:	delete_attribute
		},
		success: function(){
			location.reload();
		}
	}).done(function() {
		console.log('reload pages');
	});
}

$("#okSave").click(function(evt){
	
	var mention_id		= $(".table_EditScore").val();
	var score			= $("#selectScoreEdit option:selected").val();
	var id_attribute	= $("#idAttribute").val();
	
	saveRowWithScore(mention_id, id_attribute, score);
});

function saveRowWithScore(mention_id, id_attribute, score){
	$.ajax({
		url: "/sentiment/save-score",
		data: {  
			mention_id			:	mention_id,
			id_attribute		:	id_attribute,
			score				:	score
		},
		success: function(){
			location.reload();
		}
	}).done(function() {
		console.log('reload pages');
	});
}
