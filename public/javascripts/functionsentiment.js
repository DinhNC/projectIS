
$(document).ready(function(){
	$('#from').datetimepicker({
		format:'Y-m-d',
		onShow:function( ct ){
			this.setOptions({
				// maxDate:$('#to').val() ? $('#to').val():false
			})
		},
		timepicker:false
	});
	$('#to').datetimepicker({
		format:'Y-m-d',
		onShow:function( ct ){
			this.setOptions({
				// minDate:$('#from').val() ? $('#from').val():false
			})
		},
		timepicker:false
	});
});
$('.advancedSearch').one('click', function(evnt){
   $('.filtertable').show(); 
   $('#simple').show();
   $('#advance').hide();
});

$('.simpleSearch').one('click', function(evnt){
   $('.filtertable').hide(); 
   $('#simple').hide();
   $('#advance').show();
});

$('#add-row').click(function(evt) {
    $("#modalAddRow")
    .on('show.bs.modal', function(e){
        var $parentRow		= $('.table-row-add-row').closest('tr');
		$('.table-row-add-row input[name=case]').val(0);
        $('#btnAddRowSave').click( function(evt) {
            $("#modalCheckCase").modal('hide');
            addrow($parentRow);

        });
		$('#btnAddTopicWordSave').click( function(evt) {
            $("#modalCheckCase").modal('hide');
            var topic_val = $('.table-row-add-row').find('#select_topic_addRow').val();
            if( topic_val === '0')
            {
            	alert('please choose topic options!');
            	return;
            }
            // $(this).off( "click" );
            addTopicWord($parentRow);
        });
    })
    .modal("show");
});

$('.table-row-add-row input[name=case]').click(function(evt){    
    var value   = $(this).val();
    var $input  = $(this);
	$("#modalCheckCase")
    .on('show.bs.modal', function(e){
        var arrayChekbox	= $(e.currentTarget).find('input[name="isCheck"]');
        var arrValues		= value.split('-');
		
        for(var i = 0; i< arrValues.length; i++){
            for(var j=0; j< arrayChekbox.length; j++){
                if(arrayChekbox.eq(j).val() === arrValues[i]){
                    arrayChekbox.eq(j).attr('checked', true);
                }
            }
        }
    })
    .modal('show');
    
    $('#btnSave').one('click', function(evt) {
        var $checkboxes = $("input[name='isCheck']:checked");
        var valueCheck = [];
        $checkboxes.each(function(index, element){
            valueCheck.push($(this).val());
        });
        var arr = valueCheck.join("-");
        $input.val(arr);
        $("#modalCheckCase").modal('hide'); 
    });
});

$('.table-row-add-row input[name=type]').on('input', function(evt){
	var value 	= $(this).val();
	$('#score-add-row').attr('disabled', false);
	$('#direction-add-row').attr('disabled', false).removeAttr('style');
	$('#case-add-row').attr('disabled', false);

	if ( !value.search(/^sp/gi) ) 
	{
		$('#score-add-row').val(0).attr('disabled', true);
		$('#direction-add-row').attr('disabled', true).attr('style', 'border:0px; background-color: white;');;
		$('#case-add-row').attr('disabled', true);
	}

	if( value === 'sp_pos' )
	{
		$('#score-add-row').val(1);
	}
	if( value === 'sp_neu' )
	{
		$('#score-add-row').val(0);
	}
	if( value === 'sp_neg' )
	{
		$('#score-add-row').val(-1);
	}
});

$('.table-row .action').click(function(){	
	var $parentRow		= $(this).closest('tr');
	var dictionaryId	= $parentRow.data('id');
	if( $(this).data('action') === 'edit' )
	{
		editRowById($parentRow, dictionaryId);
	}
	else if( $(this).data('action') === 'cancel' )
	{
		cancelEdit($parentRow);
	}
	else if( $(this).data('action') === 'save' )
	{
		saveRowById($parentRow, dictionaryId);
	}
	else if( $(this).data('action') === 'saveTopicWord' )
	{
		saveTopicWordById($parentRow, dictionaryId);
	}
	else if( $(this).data('action') === 'del' )
	{
		$("#modalDelete")
		.on('show.bs.modal', function(e){
		})
		.modal('show');
		$("#btnDelete").one('click', function(evt){
			deleteRowById(dictionaryId);
		});
	}
	else if( $(this).data('action') === 'delTopicWord' )
	{
		$("#modalDelete")
		.on('show.bs.modal', function(e){
		})
		.modal('show');
		$("#btnDelete").one('click', function(evt){
			deleteTopicWordById(dictionaryId);
		});
	}
});

$('.table-row input[name=case]').click(function(evt){    
    var value   = $(this).val();
    var $input  = $(this);
	$("#modalCheckCase")
    .on('show.bs.modal', function(e){
        var arrayChekbox = $(e.currentTarget).find('input[name="isCheck"]');
        var arrValues = value.split('-');
        for(var i = 0; i< arrValues.length; i++){
            for(var j=0; j< arrayChekbox.length; j++){                
                if(arrayChekbox.eq(j).val() === arrValues[i]){
                    arrayChekbox.eq(j).attr('checked', true);
                }
            }
        }
    })
    .modal('show');
    
    $('#btnSave').one('click', function(evt) {
        var $checkboxes = $("input[name='isCheck']:checked");
        var valueCheck = [];
        $checkboxes.each(function(index, element){
            valueCheck.push($(this).val());
        });
        var arr = valueCheck.join("-");
        $input.val(arr);
        $("#modalCheckCase").modal('hide');
        
    });
});

function addrow($parentRow){
	var actionUrl	= $parentRow.data('action');
	var params		= {};
	var $allInputs	= $parentRow.find('input,select');
	var $input		= null;
	for(var i = 0; i < $allInputs.length; i++)
	{
		$input = $allInputs.eq(i);
		params[$input.attr('name')] = $input.val();
	}
	
	if(params.word === "")
	{
		alert("Word is not null!!!");
		return;
	}
	$.post(
		actionUrl,
		params,
		function(data){
			addRowPostDB( params);
		}
	);
}

function addTopicWord($parentRow){
	var actionUrl	= $parentRow.data('action');
	var params		= {};
	var $allInputs	= $parentRow.find('input,select');
	var $input		= null;
	for(var i = 0; i < $allInputs.length; i++)
	{
		$input = $allInputs.eq(i);
		params[$input.attr('name')] = $input.val();
	}	
	$.post(
		actionUrl,
		params,
		function(data){
			addTopicWordToDB( params);
		}
	);
}

function addRowPostDB(data, id){
	$.ajax({
		url: "/sentiment/addrow",
		data: {
			word		:	data.word,
			type		:	data.type,
			score		:	data.score,
			direction	:	data.direction,
			domain		:	data.domain,
			case		:	data.case
		},
		success: function(data){
			if( data.error )
			{
				alert('Please check keyword!');
				return;
			}
			$('#btnAddRowSave').off( "click" );
			location.reload();
			
		},
        error: function(){
        	alert('Add row error!');
			location.reload();
		}
	}).done(function() {
		console.log('reload pages');
	});
};

function addTopicWordToDB(data, id){
	$.ajax({
		url: "/sentiment/addtopicword",
		data: {
			word		:	data.word,
			type		:	data.type,
			score		:	data.score,
			direction	:	data.direction,
			topic		:	data.topic,
			case		:	data.case
		},
		success: function(data){
			if( data.error )
			{
				alert('Please check keyword before add!');
				return;
			}
			$('#btnAddTopicWordSave').off( "click" );
			location.reload();
		},
        error: function(){
			alert('Add row error!');
			location.reload();
		}
	}).done(function() {
		console.log('reload pages');
	});
};

function editRowById($parentRow, id){
	$parentRow.find('input,select').removeAttr('disabled');
    $parentRow.find('input,select').removeAttr('style');	
	var word =$parentRow.find('input[name=word]').val();
    $parentRow.find('input[name=word]').focus().val('').val(word);
	$parentRow.find('input,select').removeAttr('style');
}

function cancelEdit($parentRow){
	$parentRow.find('input,select').attr('disabled', true);
    $parentRow.find('input,select').attr('style', 'border:0px');
}

function saveRowById($parentRow, id){
	$parentRow.find('input,select').attr('disabled', true);
    $parentRow.find('input,select').attr('style', 'border:0px; background-color: white;');
	var actionUrl	= $parentRow.data('action');
	var params		= {};
	var $allInputs	= $parentRow.find('input,select');
	var $input		= null;
	for(var i = 0; i < $allInputs.length; i++)
	{
		$input = $allInputs.eq(i);
		params[$input.attr('name')] = $input.val();
	}	
	$.post(
		actionUrl,
		params,
		function(data){
			saveRowPostDB(params, id);
		}
	);
}

function saveRowPostDB(data, id){
	$.ajax({
		url: "/sentiment/savebyid",
		data: {  
			key			:	id,
			word		:	data.word,
			type		:	data.type,
			score		:	data.score,
			direction	:	data.direction,
			domain		:	data.domain,
			case		:	data.case
		},
		success: function(data){
			location.reload();
		}
	}).done(function() {
		console.log('reload pages');
		location.reload();
	});
}

function saveTopicWordById($parentRow, id){
	$parentRow.find('input,select').attr('disabled', true);
    $parentRow.find('input,select').attr('style', 'border:0px');
	var actionUrl	= $parentRow.data('action');
	var params		= {};
	var $allInputs	= $parentRow.find('input,select');
	var $input		= null;
	for(var i = 0; i < $allInputs.length; i++)
	{
		$input = $allInputs.eq(i);
		params[$input.attr('name')] = $input.val();
	}	
	$.post(
		actionUrl,
		params,
		function(data){
			saveTopicWordToDB(params, id);
		}
	);
}

function saveTopicWordToDB(data, id){
	$.ajax({
		url: "/sentiment/saveTopicWordbyid",
		data: {  
			key			:	id,
			word		:	data.word,
			type		:	data.type,
			score		:	data.score,
			direction	:	data.direction,
			topic		:	data.topic,
			case		:	data.case
		},
		success: function(){
			location.reload();
		}
	}).done(function() {
		console.log('reload pages');
		location.reload();
	});
}

function deleteRowById(id){
	$.ajax({
		url: "/sentiment/deletebyid",
		data: {id : id},
		success: function(){
			location.reload();
		},
		error: function(){
			location.reload();
		}
	}).done(function() {
		console.log('delete reload');
		location.reload();
	});
	return false;
}

function deleteTopicWordById(id){
	$.ajax({
		url: "/sentiment/deleteTopicWordbyid",
		data: {id : id},
		success: function(){
			location.reload();
		},
		error: function(){
			location.reload();
		}
	}).done(function() {
		console.log('delete reload');
		location.reload();
	});
	return false;
}