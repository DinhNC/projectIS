Date.prototype.toStringMySQLFormat = function()
{
  return this.getUTCFullYear() + '-' +
          ('00' + (this.getUTCMonth()+1)).slice(-2) + '-' +
          ('00' + this.getUTCDate()).slice(-2) + ' ' + 
          ('00' + this.getUTCHours()).slice(-2) + ':' + 
          ('00' + this.getUTCMinutes()).slice(-2) + ':' + 
          ('00' + this.getUTCSeconds()).slice(-2);
};

$( document ).ready(function(){
	
	$('.from-date, .to-date').datetimepicker({
		format:'Y-m-d',
		onShow:function( ct )
		{
			this.setOptions({
			})
		},
		timepicker:false
	});

	$('.select-label').editable({
        mode	: 'inline',
        source	: classifySelect($('.select-label').data('all')),
        url 	: '/report/report-management-edit',
        title	: 'Selected',
        success: function(response, newValue) {
            if(!response.success) return response.msg;
        }
    });

    $('.select-expected').editable({
        mode	: 'inline',
        source	: classifySelect($('.select-expected').data('all')),
        url 	: '/report/report-management-edit',
        title	: 'Expected',
        success: function(response, newValue) {
            if(!response.success) return response.msg;
        }
    });

	var dataSentiment = [];
    $('.sentiment-selected').click(function(evt){
    	showModalSentiment();
    	$('.sentiment-submit').click(function(evt){
    		showModalRotate();
			var label 	= $('.sentiment-label').val();
			if( !label )
			{
				alert('Vui lòng nhập sentiment label');
			}
			else {
		    	sentimentWithSelected(label, dataSentiment);
			}
	    });
    });

    $('.sentiment-all').click(function(evt){

    	showModalSentiment();
    	$('.sentiment-submit').click(function(evt){
    		showModalRotate();
			var label 	= $('.sentiment-label').val();
			if( !label )
			{
				alert('Vui lòng nhập sentiment label');
			}
			else{
	    		sentimentWithAll(label);
			}
	    });
    });

    $('.delete-all').click(function(evt){
    	$("#modalDelete")
		.on('show.bs.modal', function(e){

		})
		.modal('show');

		$('.btn-delete-row').click(function(evt){
			deleteAll();
		});
    });

	$('.detail').click(function(evt) {
		var $parentRow		= $(this).parents('.table_data').data('source');
		
		$("#modalDetail")
	    .on('show.bs.modal', function(e){
	  		$('.title-doc').text($parentRow.title);
	  		$('.content-doc').text($parentRow.content);
	    })
	    .modal("show");
	});

	$('.check-box').click(function(evt){
		var row = $(this).data('source');
		dataSentiment.push(row);
	});

	$('.delete-row').click(function(evt){

		$("#modalDelete")
		.on('show.bs.modal', function(e){

		})
		.modal('show');

		var row 		= $(this).data('source');
		$('.btn-delete-row').click(function(evt){

			deleteRowSentiment(row);
		});
	});

	$('.btn-cancel').click(function(evt){
		location.reload();
	});

	$('.mention_attr_expected').click(function(evt){
		
		var attribute 		= {
			'id'			: $(this).data('attr-id'),
			'sentiment' 	: $(this).val()
		}
		var source			= $(this).parents('.table_data').data('source');
			source 			= getSentimentForAttribute(attribute, source);
		updateAttributeExpected(source);
	});
});

function showModalSentiment()
{
	$('#modalSentiment')
	.on('show.bs.modal', function(e){
	})
	.modal('show');
};

function showModalRotate()
{
	$('#modalRotate')
	.on('show.bs.modal', function(e){
	})
	.modal('show');
};

function classifySelect(data)
{
	var storage 	= [],
		temp		= null;
	if( !data )
	{
		return storage;
	}
	for( var i = 0; i< data.length; i++ )
	{
		temp = {};
		temp.value 	= data[i];
		temp.text 	= data[i];
		storage.push(temp);
	}
	return storage;
};

function sentimentWithSelected(label, docs)
{
	$.ajax({
		url 	: '/report/run-selected',
		data 	: {
			'data' 	: docs,
			'label' : label
		},
		success : function(results){
			if(results.error)
			{
				$('#modalRotate').modal('hide');
				alert('Run Selected Error | ' + JSON.stringify(results.error));
			}
			else{
				location.reload();
			}
		},
		error  	: function(error)
		{
			alert('Run Selected Error | ' + error.toString());
		}
	}).done(function(){
		console.log('reloads !');
	});
};

function sentimentWithAll(label)
{
	var params = $('#form-search').serializeArray();
		params.push({ name : 'label', value : label });
	$.ajax({
		url 	: '/report/run-all',
		data 	: $.param(params),
		success : function(results){
			if( results.error )
			{
				$('#modalRotate').modal('hide');
				alert('Run All Error || Label already exists');
			}
			else{
				location.reload();
			}
		},
		error  	: function(error)
		{
			alert('Run All Error || Label already exists');
			// location.reload();
		}
	}).done(function(){
		console.log('reloads !');
	});
};

function deleteRowSentiment(row)
{
	$.ajax({
		url 	: '/report/delete-row',
		data 	: {
			'id' : row.id
		},
		success : function(results){
			location.reload();
		},
		error  	: function(error)
		{
			alert(error);
		}
	}).done(function(){
		console.log('reloads !');
	});
};

function deleteAll()
{
	var params = $('#form-search').serializeArray();
	$.ajax({
		url 	: '/report/delete-all',
		data 	: $.param(params),
		success : function(results){
			location.reload();
		},
		error  	: function(error)
		{
			alert(error);
		}
	}).done(function(){
		console.log('reloads !');
	});
};

function updateAttributeExpected(source)
{
	$.ajax({
		url 	: '/report/update-attribute-expected',
		data 	: {
			'source' : source
		},
		success : function(results){
			// location.reload();
		},
		error  	: function(error)
		{
			alert('Updated Expected Err!');
		}
	}).done(function(){
		console.log('reloads !');
	});
};

function getSentimentForAttribute(attr, source)
{
	var arrAttr = source.expected;
	var data 	= [];
	for(var i = 0; i < arrAttr.length; i++ )
	{
		if( attr.id === parseInt(arrAttr[i].id) )
		{
			arrAttr[i].sentiment = attr.sentiment;
		}
		data.push(arrAttr[i]);
	}
	source.expected = data;
	return source;
};