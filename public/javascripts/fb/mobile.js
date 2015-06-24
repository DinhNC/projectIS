Date.prototype.toStringMySQLFormat = function()
{
    return this.getUTCFullYear() + '-' +
        ('00' + (this.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + this.getUTCDate()).slice(-2) + ' ' + 
        ('00' + this.getUTCHours()).slice(-2) + ':' + 
        ('00' + this.getUTCMinutes()).slice(-2) + ':' + 
        ('00' + this.getUTCSeconds()).slice(-2);
};

$('.action-edit').click(function(e){
    var row = $(this).data("item");

    $(edit_phone_number).val(row.phone_number);
    $(edit_id_user).val(row.id_user);

    var time = new Date(row.added_at).getTime();

    $(edit_time).val(new Date(time).toStringMySQLFormat());
    $(edit_status).val(row.status);
    $(edit_note).val(row.note);
});

$('.action-delete').click(function(e){
    var row = $(this).data("item");
    $('#delete_phone_number').text(row.phone_number);
    $('#delete_phone_number_cur').val(row.phone_number);
});

$('.sim-care').click(function(e){
    var row = $(this).data("item");
    $(care_phone_number).val(row.phone_number);
});


$('.action-history').click(function(e){
    var row = $(this).data("item");
    $.get('/fbmanagement/sim-management/get-history', {
        'phone_number' : row.phone_number
    }, function(result){
        var arrText = [];
        var row     = null;
        for(var i = 0; i < result.length; i++)
        {
            row     = result[i];
            arrText.push('<tr class="text-center">');
            arrText.push('<td>'+(i+1)+'</td>');
            arrText.push('<td>'+row.phone_number+'</td>');
            arrText.push('<td>'+row.id_user+'</td>');
            arrText.push('<td>'+new Date(row.updated_at).toStringMySQLFormat()+'</td>');
            arrText.push('<td>'+row.checklist+'</td>');
            arrText.push('</tr>');
        }
        $("#history-detail tbody").html(arrText.join(''));
    });
});
