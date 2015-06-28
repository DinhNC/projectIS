/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function setSelectTagValueByURL(id, url) {
    var string = url.split('?');
    var temp = string[1].split('&');
    for(var i=0;i<temp.length;i++) {
        var subtemp = temp[i].split('=');
        if(subtemp[0] === 'state') {
            $(id).val(subtemp[1]);
            break;
        }
    }
}

$(document).ready(function(){
    $('#checkAll').click(function() {
        var cbArray = $('input:checkbox');
        var nLength = cbArray.length;
        for(var i = 0; i < nLength; i++){
            if(!($(cbArray[i]).is(':disabled')))
                $(cbArray[i]).prop('checked', $(this).prop('checked'));
        }
    });
    var url = window.location.href;
    $('#submit').click(function() {
        var text = $('#text-field').val();
        if(text === "") {
            $('#text-field').attr('placeholder','Please input');
            $('.form-group').addClass('has-error bg-danger');
            $('#text-field').focus();
            return false;
        }
    });
    $('#menu a').each(function() {
        var string = url.split('?');
        if(this.href === string[0]) {
            $(this).closest('li').addClass('active');
            $(this).parents('li').addClass('active');
            return;
        }
    });
    setSelectTagValueByURL('#state',window.location.href);
    $("td:contains('IDLE')").css("color","#0066FF");
    $("td:contains('STOPPED')").css("color","#FF0000");
    $("td:contains('UPDATING')").css("color","#008A00");
    $("td:contains('ERROR')").css("color","#E65C00");
    $("td:contains('FAILURE')").css("color","#E65C00");
    $("td:contains('NOCHILD')").css("color","#CCCC00");
    $("td:contains('PENDING')").css("color","#FFCC00");
    $("td:contains('SUCCESS')").css("color","#008A00");
});