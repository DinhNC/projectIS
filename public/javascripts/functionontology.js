$('.table-row-ontology .action').click(function(){
	var $parentRow			= $(this).closest('tr');
	var ontologyEntityId	= $parentRow.data('id');
	if( $(this).data('action') === 'edit' )
	{
		editRowOntologyById($parentRow, ontologyEntityId);
	}
	else if( $(this).data('action') === 'cancel' )
	{
		cancelOntologyEdit($parentRow);
	}
	else if( $(this).data('action') === 'save' )
	{
		saveRowOntologyById($parentRow, ontologyEntityId);
	}
	else if( $(this).data('action') === 'del' )
	{
		$("#modalDelete")
		.on('show.bs.modal', function(e){
		})
		.modal('show');
		$("#btnDelete").one('click', function(evt){
			deleteRowOntologyById(ontologyEntityId);
		});		
	}
});

function editRowOntologyById($parentRow, id){
	$parentRow.find('input,select,textarea').removeAttr('disabled');
    $parentRow.find('input,select,textarea').removeAttr('style');
    $parentRow.find('input[name=add_from_keyword]').attr('disabled', true);
    $parentRow.find('input[name=add_from_keyword]').attr('style', 'border:0px');
}

function cancelOntologyEdit($parentRow){
	$parentRow.find('input,select,textarea').attr('disabled', true);
    $parentRow.find('input,select,textarea').attr('style', 'border:0px; background-color: white;');
    $parentRow.find('input[name=add_from_keyword]').attr('disabled', true);    
}

function saveRowOntologyById($parentRow, id){
	$parentRow.find('input,select,textarea').attr('disabled', true);
    $parentRow.find('input,select,textarea').attr('style', 'border:0px; background-color: white;');
    $parentRow.find('input[name=add_from_keyword]').attr('disabled', true);
	var actionUrl	= $parentRow.data('action');
	var params		= {};
	var $allInputs	= $parentRow.find('input,select,textarea');
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
			saveRowOntologyPostDB(params, id);
		}
	);
}

$('.table-row input[name=alias]').click(function(evt){    
    var value   = $(this).val();
    var $input  = $(this);
    $input.val(value);
});

function saveRowOntologyPostDB(data, id){
	$.ajax({
		url: "/sentiment/ontology/savebyid",
		data: {  
			id					:	id,
			name				:	data.name,
			id_type				:	data.types,
			id_domain			:	data.domain,
			id_parent			:	data.id_parent,
			add_from_keyword	:	data.add_from_keyword,
			alias				:	data.alias
		},
		success: function(){
			location.reload();
		}
	}).done(function() {
		console.log('reload pages');
	});
}

function deleteRowOntologyById(id){
	$.ajax({
		url: "/sentiment/ontology/deletebyid",
		data: {id : id},
		success: function(){
			location.reload();
		},
		error: function(){
			location.reload();
		}
	}).done(function() {
		console.log('delete reload');
	});
	return false;
}

$('#add-row').click(function(evt) {
    $("#modalAddRow")
    .on('show.bs.modal', function(e){
        var $parentRow		= $('.table-row-add-row').closest('tr');
        $('#btnAddRowSave').click(function(evt) {
            addRowOntology($parentRow);
        });
    })
    .modal("show");
});

function addRowOntology($parentRow){
	var actionUrl	= $parentRow.data('action');
	var params		= {};
	var $allInputs	= $parentRow.find('input,select,textarea');
	var $input		= null;
	for(var i = 0; i < $allInputs.length; i++)
	{
		$input = $allInputs.eq(i);
		params[$input.attr('name')] = $input.val();
	}
	
	var name	= params.name.replace(/\s+/gi, " ");
	var alias	= params.alias.replace(/\s+/gi, " ");
	if(name === "" || name === " " || alias === "" || alias === " ")
	{
		alert("Name and alias is not null!!!");
		return;
	}
	$.post(
		actionUrl,
		params,
		function(data){
			addRowOntologyPostDB( params);
		}
	);
}

function addRowOntologyPostDB(data, id){
	$.ajax({
		url: "/sentiment/ontology/addrow",
		data: {
			name                :	data.name,
			id_type             :	data.types,
			domain              :	data.domain,
			id_parent           :	data.id_parent,
			add_from_keyword	:	data.add_from_keyword,
			alias               :	data.alias
		},
		success: function(data){
			alert(data.message);
			if(data.results === "true")
			{
				location.reload();
			}			
		},
        error: function(){
			location.reload();
		}
	}).done(function() {
		console.log('reload pages');
	});
}