Date.prototype.toStringMySQLFormat = function(withoutSecond)
{
    var str = this.getUTCFullYear() + '-' +
        ('00' + (this.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + this.getUTCDate()).slice(-2) + ' ' + 
        ('00' + this.getUTCHours()).slice(-2) + ':' + 
        ('00' + this.getUTCMinutes()).slice(-2);

    if( !withoutSecond )
    {
        str += (':' + ('00' + this.getUTCSeconds()).slice(-2));
    }
    return str;
};

$("#id_user").select2({
	allowClear: true
});

$(document).ready(function(){//Begin $.ready

$('.action-edit').click(function(e){
	e.preventDefault();
	var row = $(this).data("item");

	$(edit_id_social).val(row.id_social);
	$(edit_access_token).val(row.access_token);
	$(edit_accepted_languages).val(row.accepted_languages);
	$(edit_status).val(row.status);	
	$('input[name="edit_token_type[]"]').val(row.token_type.split(","));
	$(edit_created_at).val(new Date(row.created_at).toStringMySQLFormat());
	$(edit_id_social_cur).val(row.id_social);
});

$("#checkAll").click(function(){
    $('input:checkbox').not(this).prop('checked', this.checked);
});

// Delete
$('#delete_mutiline').click(function(e){
  	e.preventDefault();
  	var arrMention = [];

	$('table input:checkbox:checked:not(#checkAll)').each(function (index){
		var id_social = $(this).data("item").id_social;
		arrMention.push(id_social);
	});

	swal(
	{
	  	title:"Are you sure?",
	  	text: "You will delete reference now!",
	  	type: "warning",
	  	showCancelButton: true,
	  	confirmButtonColor: "#DD6B55",
	  	confirmButtonText: "Yes, delete it!",
	  	cancelButtonText: "No, cancel plx!",
	  	closeOnConfirm: false,
	  	closeOnCancel: false
	},
		function(isConfirm){
	  		if (isConfirm) {
	  			$.get('fb-reference/delete',{
					ids : arrMention
				}, function(result){
				});
				swal("Deleted!", "Your reference has been deleted.", "success");
				$('table input:checkbox:checked').each(function (index){
					$(this).prop('checked', false);
				});
				location.reload(); 
	  		} else {
		    	swal("Cancelled", "Your reference is safe :)", "error");
	  		}
		}
	);
});

// Delete
$('.action-delete').click(function(e){
  	e.preventDefault();
  	var id_social = $(this).data("item").id_social;
	swal(
	{
	  	title:"Are you sure?",
	  	text: "You will delete reference now!",
	  	type: "warning",
	  	showCancelButton: true,
	  	confirmButtonColor: "#DD6B55",
	  	confirmButtonText: "Yes, delete it!",
	  	cancelButtonText: "No, cancel plx!",
	  	closeOnConfirm: false,
	  	closeOnCancel: false
	},
		function(isConfirm){
	  		if (isConfirm) {
	  			$.get('fb-reference/delete',{
					ids : id_social
				}, function(result){
				});
				swal("Deleted!", "Your reference has been deleted.", "success");
				$('table input:checkbox:checked').each(function (index){
					$(this).prop('checked', false);
				});
				location.reload(); 
	  		} else {
		    	swal("Cancelled", "Your reference is safe :)", "error");
	  		}
		}
	);
});

$("tr.reference_row").each(function(i){
	var row 			= $(this);
	var accset_token 	= $(this).find("td.td_access_token").text();
	var img_token 		= $(this).find("img.token_state");
	var id_social 		= $(this).find("td.id_social").text();

	FB.api('/'+id_social, {
		'access_token' : accset_token
	},function(response){
		if( response && response.id )
		{
			row.find("td.id_social > a").text(response.name);
			img_token.attr('src','images/check.png');
		}
		else
		{
			img_token.attr('src','images/denied.png'); 
		}
	});
});

$(".action-renew").click(function(e){
    e.preventDefault();
    var id 		=  $(this).data("item").id;
    
    FB.login(function(response){
        if(response)
        {
        	var token 	= response.authResponse.accessToken;
            console.log("response: ", token);
            $.get('/fb-reference/get-long-access-token',{
            	update_id	 : id,
				accset_token : token
			}, function(result){
				if( !result.success )
				{
					alert(result.message || "Đã có lỗi xãy ra !! Vui lòng thử lại");
					return;	
				}
				location.reload();
			});
        }
    }, {scope: 'read_stream'});
});

});//End $.ready
