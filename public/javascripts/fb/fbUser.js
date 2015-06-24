$(document).ready(function(){
    $('.action-edit-user').click(function(e){
        var row = $(this).data("item");

        $(edit_identity).val(row.identity);
        $(edit_username).val(row.username);
        $(edit_fullname).val(row.fullname);
        $(edit_link).val(row.link);
        $(edit_locale).val(row.locale);
        $(edit_priority).val(row.priority);
        $(edit_friend).val(row.friend_count);
        $(edit_subscriber).val(row.subscriber_count);
        $(edit_id).val(row.id);

    	if(row.gender === 'MALE'){
        	$('#edit_gender_1').prop('checked', true);
        }
        else  
        	if(row.gender === 'FEMALE')
    	    {
    	    	$('#edit_gender_2').prop('checked', true);
    	    }
    	    else
    	    {
    	    	$('#edit_gender_2').prop('checked', false);
    	    	$('#edit_gender_1').prop('checked', false);
    	    }
        if(row.is_user == 1){
            $('#edit_page_type_user').prop('checked', true);
        }
        else  
            $('#edit_page_type_fanpage').prop('checked', true);
        
        $(edit_type).val(row.type);    
    });

    $("#source").select2({
        allowClear: true,
        placeholder: "Select a Source"
    });
    $.fn.modal.Constructor.prototype.enforceFocus = function() {};
    $('#new_user').on('shown.bs.modal', function () {
        if( $(this).data('select2IsCalled') ) {
            return;
        }
        $(this).data('select2IsCalled', 1);

        $("#new_source").select2({
            placeholder: "Select a source",
            allowClear: true
        });
    });

    $("#show-result").click(function(e){
        e.preventDefault();
        $(this).append("<img src='/images/pacman.gif' width='20px' />")
        $.get('/fbmanagementvs2/count'+location.search, function(data){
            var result  = $("#show-result").data('result') | 0;
            var params  = $("#show-result").data('params') || {};
            var limit   = params.limit;
            var from    = params.page * limit;
            var to      = from + result;
            $("#count-result").text("Show " + result + " result(s) from " + from + " to " + to + " of total " + data.count + " row(s)");
        })
        return false;
    });
});

function graphLink() 
{
    var link    = $('#new_link').val();
    var user    = link.split('/').pop(-1);

    //check no co username khong ne
    var id      = user.split('=').pop(-1);
    if(id){
        var linkGraph = 'https://graph.facebook.com/' + id;
    }
    else {
        var linkGraph = 'https://graph.facebook.com/' + user;
    }
    
    $.get(linkGraph ,{
    }, function(result){
        if( result )
        {
            $('#new_identity').val(result.id);
            $('#new_username').val(result.username);
            $('#new_fullname').val(result.name);

            if(result.gender === 'male')
            {
                $('#new_gender_male').prop('checked', true);
            }
            if(result.gender === 'female')
            {
                $('#new_gender_female').prop('checked', true);
            }

            if(result.likes)
            {
                $('#new_subscriber').val(result.likes);
                $('#new_page_type_fanpage').prop('checked', true);
            }
        }
    });    
}