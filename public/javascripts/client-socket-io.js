$( document ).ready(function(){
	$('.progress').css('display','none');
	$('div.bs-callout.bs-callout-danger').css('display','none');
	$('div#progressNotice').css('display','none');
	$('div#errorTable').css('display','none');


	$('#formImport').ajaxForm(function() { 
		$("#myModal").on('show.bs.modal',function(e){
			$('.progress').css('display','block');
			$('div#progressNotice').css('display','block');
			$("div.modal-body").text("Read file completely! \nRecords are being processed!!! Please wait...");
			
			$('div.bs-callout.bs-callout-danger').css('display','none');
			$('table#errorResultTable').find("tr:gt(0)").remove();
			$('div#errorTable').css('display','none');
		}).modal('show');
	}); 
});

var host 	= window.location.host;
var socket  = io.connect(host);
socket.on('data', function (data) {
	if(data.percentage && data.percentage > 0){
		$('.progress-bar').css('width', data.percentage+'%');
		$('div#progressNotice').text(data.info + '-' + data.status);
	}

	if(data.complete){
		$('.progress').css('display','none');
		$('div#progressNotice').css('display','none');
		$('div.progress-bar').css('width','0%');

		if(data.failure && data.failure.length > 0){
			$("#myModal").modal('hide');
			$('div.bs-callout.bs-callout-danger').css('display','block');
			$("strong#errortNotice").text("Can not insert " + data.failure.length + " record(s):");
			$('div#errorTable').css('display','block');

			var col = ['fullname','link','identity'];
			var nCol 		= col.length,
				dataLength 	= data.failure.length;

			for(var i = 0; i < dataLength; i++){
				var row = "<tr><td>" + (data.failure[i].index + 2) + "</td>";
				
				for(var j = 0; j < nCol; j++){
					row += "<td>" + data.failure[i][col[j]] + "</td>"; 
				}

				switch(data.failure[i].type){
					case 0: data.failure[i].type = "Duplicated facebook identity of record [" + parseInt(data.failure[i].line + 2)  +"]";break
					case 1: data.failure[i].type = "Unable to get Facebook identity";break;
				}

				row += "<td>" + data.failure[i].type + "</td></tr>";
				$('table#errorResultTable').append(row);
			}
		}
		else{
			$('div.bs-callout.bs-callout-danger').css('display','block');
			$("strong#errortNotice").text("All records has been completed!!!");
		}
	}
});