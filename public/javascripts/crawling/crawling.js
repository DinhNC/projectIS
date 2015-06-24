function concentrate_Url_With_Domains(url, domains, arrayIndex){
	var total 		= arrayIndex.length;
	var listDomain 	= "";
	var result 		= url;
	
	if(total){
		listDomain += $(domains[$(arrayIndex[0]).val()]).text();
	}

	for(var i = 1; i < total; i++){
		listDomain += "," + $(domains[$(arrayIndex[i]).val()]).text();
	}

	result += listDomain;
	return [result,listDomain];
};

function onCrawling(url,arr,index){
	var arrIndex 	= $(index)
	var domains 	= $(arr);
	
	var request 	= concentrate_Url_With_Domains(url,domains,arrIndex);
	console.log(request[0]);
	$.ajax({
     	type 		: "GET",
     	url			: request[0],
	    dataType 	: 'json',
     	success: function(msg){
			$("#myModal").on('show.bs.modal',function(e){
				$("#myModalLabel").text("Crawling service message:");
				
				var flag = "FAILURE";
				if(msg.status){
					flag = "SUCCESS";
				}

				$(".modal-body").text(msg.message + " [" + request[1] +"] is " + flag);
			}).modal('show');	
     	},
     	error: function(xhr){
	        console.log(xhr);
     	}
	});
};

function onCrawlingDomain(url, domain){
	$.ajax({
     	type 		: "GET",
     	url			: url,
	    dataType 	: 'json',
     	success: function(msg){
			$("#myModal").on('show.bs.modal',function(e){
				$("#myModalLabel").text("Crawling service message:");
				
				var flag = "FAILURE";
				if(msg.status){
					flag = "SUCCESS";
				}

				$(".modal-body").text(msg.message + " [" + domain +"] is " + flag);
			}).modal('show');	
     	},
     	error: function(xhr){
	        console.log(xhr);
     	}
	});
	$("#SaveModalState").one('click', function(evt){
		$("#myModal").modal('hide');
	});
};

$("#AcceptRefreshPage").click(function(){
	$("#myModal").modal('hide');
	location.reload(true);
});
