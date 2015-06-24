function onViewDetail(id, id_source,stt,current,link,end){
	$("#viewInDetail").on('show.bs.modal',function(e){
		$("#dtSource").text(id_source);
		$("#dtID").text(id);
		$("#dtSTT").text(stt);
		$("#dtCurrentPage").text(current);
		$("#dtCurrentLink").text(link);
		if(end == 1)
			$("#dtEnd").text("Yes");
		else
			$("#dtEnd").text("No");	
	}).modal('show');
};

function resetDetail(id, id_source,page,state){
	$.ajax({
		url: "/news/category/resetDetail",
		data: {  
			id			: id,
			id_source	: id_source,
			page 		: page,
			state 		: state
		},
		success: function(data){
			location.reload();
		},
		error: function(){
			
		}
	}).done(function() {
		console.log('reload pages');
	});
};

$("#ResetDetail").click(function(evt){
	if(confirm("Are you sure?") == true){
		$("#viewInDetail").modal('hide');
		console.log($("#dtID").text() + $("#dtSource").text(), $("#item_page").val(), $("#state").val());
		resetDetail($("#dtID").text(), $("#dtSource").text());
	}
});


