//http://blog.roymj.co.in/url-validation-using-regular-expression-javascript/
function isValidationDomain(domain){
	var message;
	var myRegExp =/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/;
	return myRegExp.test(domain);
};

$( document ).ready(function(){
	$("#Add").click(function(event){
		event.preventDefault();
		var domain 	 	= $("#domain").val();
		var priority 	= $("#priority").val();
		var name	 	= $("#name").val();
		var	type 	 	= $("#type").val();
		var	pattern 	= $("#pattern").val();

		if(!domain){
			$("#myModal").on('show.bs.modal',function(e){
				$("h4.modal-title").text("Error!!!");
				$("div.modal-body").text("Please enter domain in domain field");
				$("#SaveModalState").hide();
			}).modal('show');
			return;
		}

		if(!isValidationDomain(domain)){
			$("#myModal").on('show.bs.modal',function(e){
				$("h4.modal-title").text("Error!!!");
				$("div.modal-body").text("Your domain is invalid, please provide another one!!!");
				$("#SaveModalState").hide();
			}).modal('show');
			return;			
		}

		if(!name){
			$("#myModal").on('show.bs.modal',function(e){
				$("h4.modal-title").text("Error!!!");
				$("div.modal-body").text("Please enter domain name in name field");
				$("#SaveModalState").hide();
			}).modal('show');
			return;
		}

		if(!priority || isNaN(priority)){
			$("#myModal").on('show.bs.modal',function(e){
				$("h4.modal-title").text("Error!!!");
				$("div.modal-body").text("Please provide number in priority field");
				$("#SaveModalState").hide();
			}).modal('show');
			return;
		}
		
		if(!type || type.length <= 0){
			$("#myModal").on('show.bs.modal',function(e){
				$("h4.modal-title").text("Error!!!");
				$("div.modal-body").text("You must chose at least one option in type field");
				$("#SaveModalState").hide();
			}).modal('show');
			return;			
		}
		
//		if(!pattern || pattern.length <= 0){
//			$("#myModal").on('show.bs.modal',function(e){
//				$("h4.modal-title").text("Error!!!");
//				$("div.modal-body").text("You must chose at least one option in pattern field");
//				$("#SaveModalState").hide();
//			}).modal('show');
//			return;			
//		}

		$("#formAddDomainSource").submit();
			
	});
	
	$("#Save").click(function(event){
		event.preventDefault();
		var domain 	 	= $("#domain").val();
		var priority 	= $("#priority").val();
		var name	 	= $("#name").val();
		var	type 	 	= $("#type").val();
		var	pattern 	= $("#pattern").val();

		if(!domain){
			$("#myModal").on('show.bs.modal',function(e){
				$("h4.modal-title").text("Error!!!");
				$("div.modal-body").text("Please provide url in domain field");
				$("#SaveModalState").hide();
			}).modal('show');
			return;
		}

		if(!isValidationDomain(domain)){
			$("#myModal").on('show.bs.modal',function(e){
				$("h4.modal-title").text("Error!!!");
				$("div.modal-body").text("Your domain is invalid, please provide another one!!!");
				$("#SaveModalState").hide();
			}).modal('show');
			return;			
		}

		if(!name){
			$("#myModal").on('show.bs.modal',function(e){
				$("h4.modal-title").text("Error!!!");
				$("div.modal-body").text("Please provide domain name in name field");
				$("#SaveModalState").hide();
			}).modal('show');
			return;
		}

		if(!priority || isNaN(priority)){
			$("#myModal").on('show.bs.modal',function(e){
				$("h4.modal-title").text("Error!!!");
				$("div.modal-body").text("Please provide number in priority field");
				$("#SaveModalState").hide();
			}).modal('show');
			return;
		}
		
		if(!type || type.length <= 0){
			$("#myModal").on('show.bs.modal',function(e){
				$("h4.modal-title").text("Error!!!");
				$("div.modal-body").text("You must chose at least one option in type field");
				$("#SaveModalState").hide();
			}).modal('show');
			return;			
		}
		
//		if(!pattern || pattern.length <= 0){
//			$("#myModal").on('show.bs.modal',function(e){
//				$("h4.modal-title").text("Error!!!");
//				$("div.modal-body").text("You must chose at least one option in pattern field");
//				$("#SaveModalState").hide();
//			}).modal('show');
//			return;			
//		}

		$("#formUpdateDomainSource").submit();
	});
});