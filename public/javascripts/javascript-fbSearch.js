$('#localCheckAll').click(function() {
    var cbArray = $('input.localSubCheck');
    var nLength = cbArray.length;
    for(var i = 0; i < nLength; i++){
        if(!($(cbArray[i]).is(':disabled')))
            $(cbArray[i]).prop('checked', $(this).prop('checked'));
    }
});


$('#faceCheckAll').click(function() {
    var cbArray = $('input.faceSubCheck');
    var nLength = cbArray.length;
    for(var i = 0; i < nLength; i++){
        if(!($(cbArray[i]).is(':disabled')))
            $(cbArray[i]).prop('checked', $(this).prop('checked'));
    }
});


$('#removeBtn').click(function(event) { 
    event.preventDefault();
    var cbArray = $('input.localSubCheck:checked');
    if(cbArray.length > 0){
        $('#localSearchForm').submit();
    }
    
});

$('#insertBtn').click(function(event) { 
    event.preventDefault();
    var cbArray = $('input.faceSubCheck:checked');
    if(cbArray.length > 0){
        $('#faceSearchForm').submit();
    }
    
});

$( "a.token-hint" ).click(function(e) {
    e.preventDefault();
    $('.guile').toggle();
});