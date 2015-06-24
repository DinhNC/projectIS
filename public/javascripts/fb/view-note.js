function ViewNote(id,log){
	$("#myModal").on('show.bs.modal',function(e){
		$("#ntID").text(id);
		$("#ntNote").val(log);
	}).modal('show');
};

function onChangeNote(id, log){
	$.ajax({
		url: "/fbmanagement/fb-account/change-note",
		data: {  
			id  : id,
			log : log
		},
		success: function(data){
			$("#announment-model").on('show.bs.modal',function(e){
				$("#announcement").text("Note has been changed");
			}).modal('show');
			
			location.reload();
		},
		error: function(){
			$("#announment-model").on('show.bs.modal',function(e){
				$("#announcement").text("Something goes wrong!!");
			}).modal('show');
		}
	}).done(function() {
		console.log('reload pages');
	});
};

$("#ChangeNote").click(function(evt){
	if(confirm("Are you sure?") == true){
		$("#myModal").modal('hide');
		onChangeNote($("#ntID").text(), $("#ntNote").val());
	}
});
