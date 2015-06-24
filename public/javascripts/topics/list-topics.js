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
$( document ).ready(function() {
  	$("#btn-arow li a").each(function(index){
  		$(this).on("click", function(e){
  			e.preventDefault();
  			$("#btn-search").text($(this).text());
  			$("#search_type_text").val($(this).text());
		    $("#search_type").val(index);
  		});
  	});
	//Hover
	$("td.hover-data").popover({
		html		: true,
		trigger		: 'hover'
	});

	$('.ensure_data').click(function(e){
		var row = $(this).data("item");

		$('#ensure_id').val(row.id)
		if( row.ensure_updated_at)
			$(ensure_updated_at).val(new Date(row.ensure_updated_at).toStringMySQLFormat(true));
		else
			$(ensure_updated_at).val('');
		$(ensure_failed_total).val(row.ensure_failed_total);
		$(ensure_last_status).val(row.ensure_last_status);
		if(row.ensure_range_from)
			$(ensure_range_from).val(new Date(row.ensure_range_from).toStringMySQLFormat(true));
		else
			$(ensure_range_from).val('');
		if(row.ensure_range_to)
			$(ensure_range_to).val(new Date(row.ensure_range_to).toStringMySQLFormat(true));
		else
			$(ensure_range_to).val('');
		$(ensure_range_offset).val(row.ensure_range_offset);
		$(ensure_core_segment).val(row.ensure_core_segment)
		$(ensure_state).val(row.ensure_state);
		
		if(row.allow_ensure_copy == 0){
			$('#allow_ensure_copy_off').prop('checked', true);
		}
		else{
			$('#allow_ensure_copy_on').prop('checked', true);
		}

		$('#ensure_range_from, #ensure_range_to').change(function(e){
	  		$('#ensure_range_offset').val('*');
	  		$('#ensure_core_segment').val(0);
  		});

		if(row.ensure_state == 'UPDATING'){
			$('#ensure_state').attr("readonly", true);
		}
		$('#alt_ensure_query').val(row.alt_ensure_query);
  	});

	$('.comment_data').click(function(e){
		var row = $(this).data("item");

		$('#comment_id').val(row.id)
		if (row.comment_updated_at)
			$(comment_updated_at).val(new Date(row.comment_updated_at).toStringMySQLFormat(true));
		else
			$(comment_updated_at).val('');
		$(comment_failed_total).val(row.comment_failed_total);
		$(comment_last_status).val(row.comment_last_status);
		$(comment_state).val(row.comment_state);
		
		if(row.allow_copy_comment == 0){
			$('#allow_copy_comment_off').prop('checked', true);
		}
		else{
			$('#allow_copy_comment_on').prop('checked', true);
		}

		if(row.comment_state == 'UPDATING'){
			$('#comment_state').attr("readonly", true);
		}
  	});

  	$('.old_data').click(function(e){
		var row = $(this).data("item");

		$('#old_id').val(row.id)
		if(row.old_updated_at)
			$(old_updated_at).val(new Date(row.old_updated_at).toStringMySQLFormat(true));
		else
			$(old_updated_at).val('');
		$(old_failed_total).val(row.old_failed_total);
		$(old_last_status).val(row.old_last_status);
		if(row.old_range_from)
			$(old_range_from).val(new Date(row.old_range_from).toStringMySQLFormat(true));
		else
			$(old_range_from).val('');
		if(row.old_range_to)
			$(old_range_to).val(new Date(row.old_range_to).toStringMySQLFormat(true));
		else
			$(old_range_to).val('');
		$(old_range_offset).val(row.old_range_offset);
		$(old_core_segment).val(row.old_core_segment)
		$(old_state).val(row.old_state);
		
		if(row.allow_copy_old_docs == 0){
			$('#allow_old_copy_off').prop('checked', true);
		}
		else{
			$('#allow_old_copy_on').prop('checked', true);
		}

		if(row.old_state == 'UPDATING'){
			$('#old_state').attr("readonly", true);
		}

		$('#old_range_from,#old_range_to').change(function(e){
	  		$('#old_range_offset').val('*');
	  		$('#old_core_segment').val(0);
  		});
  	});

  	$('.attribute_data').click(function(e){
		var row = $(this).data("item");

		$('#attribute_id').val(row.id)
		if(row.attribute_updated_at)
			$(attribute_updated_at).val(new Date(row.attribute_updated_at).toStringMySQLFormat(true));
		else
			$(attribute_updated_at).val('');
		$(attribute_failed_total).val(row.attribute_failed_total);
		$(attribute_last_status).val(row.attribute_last_status);
		$(attribute_group).val(row.attribute_group);
		$(attribute_state).val(row.attribute_state);
		
		if(row.allow_set_attribute == 0){
			$('#allow_set_attribute_off').prop('checked', true);
		}
		else{
			$('#allow_set_attribute_on').prop('checked', true);
		}

		if(row.attribute_state == 'UPDATING'){
			$('#attribute_state').attr("readonly", true);
		}
  	});

  	$('.fb_data').click(function(e){
		var row = $(this).data("item");
		$('#fb_custom_id').val(row.id);
		if(row.fb_custom_updated_at)
			$('#fb_custom_updated_at').val(new Date(row.fb_custom_updated_at).toStringMySQLFormat(true));
		else
			$(fb_custom_updated_at).val('');
		$('#fb_custom_failed_total').val(row.fb_custom_failed_total);
		$('#fb_custom_last_status').val(row.fb_custom_last_status);
		if(row.fb_custom_from)
			$('#fb_custom_from').val(new Date(row.fb_custom_from).toStringMySQLFormat(true));
		else
			$('#fb_custom_from').val('');
		if(row.fb_custom_to)
			$('#fb_custom_to').val(new Date(row.fb_custom_to).toStringMySQLFormat(true));
		else
			$('#fb_custom_to').val('');
		$('#fb_custom_offset').val(row.fb_custom_offset);
		$('#fb_custom_state').val(row.fb_custom_state);
		
		if(row.fb_custom_enable == 0){
			$('#fb_custom_enable_off').prop('checked', true);
		}
		else{
			$('#fb_custom_enable_on').prop('checked', true);
		}

		if(row.fb_custom_state == 'UPDATING'){
			$('#fb_custom_state').attr("readonly", true);
		}

		$('#fb_custom_from, #fb_custom_to').change(function(e){
	  		$('#fb_custom_offset').val('*');
  		});
  	});

  	//xu ly datetime
  	jQuery(function(){
		jQuery('#ensure_range_from').datetimepicker({
			// format:'m/d/Y',
			format:'Y-m-d H:i',
			defaultTime:'00:00',
			onShow:function( ct ){
				this.setOptions({
			})
		},
		timepicker:false
		});

		jQuery('#ensure_range_to').datetimepicker({
			format:'Y-m-d H:i',
			defaultTime:'00:00',
			onShow:function( ct ){
				this.setOptions({
			})
		},
		timepicker:false
		});

		jQuery('#old_range_from').datetimepicker({
			// format:'m/d/Y',
			format:'Y-m-d H:i',
			defaultTime:'00:00',
			onShow:function( ct ){
				this.setOptions({
			})
		},
		timepicker:false
		});

		jQuery('#old_range_to').datetimepicker({
			format:'Y-m-d H:i',
			defaultTime:'00:00',
			onShow:function( ct ){
				this.setOptions({
			})
		},
		timepicker:false
		});

		jQuery('#fb_custom_from').datetimepicker({
			// format:'m/d/Y',
			format:'Y-m-d H:i',
			defaultTime:'00:00',
			onShow:function( ct ){
				this.setOptions({
			})
		},
		timepicker:false
		});

		jQuery('#fb_custom_to').datetimepicker({
			format:'Y-m-d H:i',
			defaultTime:'00:00',
			onShow:function( ct ){
				this.setOptions({
			})
		},
		timepicker:false
		});

	});
  	$('.demo').hide();
    $('#view-key').click(function(e){
    	e.preventDefault();
    	$('.demo').toggle();
    });

    //xu ly ajax    
    $('.sate-copy').click(function() {
	    $('.popover').not(this).hide(); //Hides all other popovers
	    var el 	= 	$(this);	    
	    $.get(el.data('url'),function(data) {
	        el.popover({
	        	title		: 'Info',
	        	container	: 'body',
	        	content		: data,
	        	html		: true,
	        	placement 	: 'top',
	        	trigger 	: 'manual',
	        }).popover('toggle');
	    });
	});

	//Validate
	$('#ensure_submit').click(function (e) {
		var query 	= $('#alt_ensure_query').val();
		var from	= $('#ensure_range_from').val();
		var to		= $('#ensure_range_to').val();

		if( $('#allow_ensure_copy_on').is(":checked") )
		{
			var range = validateRange(from, to, 1);
			if(range !== 1)
			{
				$('.invalid-form-error-message')
					.html("You must correctly fill the fields date range or ensure query!")
					.addClass("filled");
				return;
			}
			//On moi check cau query
			var ensure_query = {
				query 	: query,
				to 		: to
			};
			$.get('/topics-detail/alt_ensure_query',{
				ensure_query : ensure_query
			}, function(result){
				if( !result || result == (-1))
				{
					$('.invalid-form-error-message')
						.html("You must correctly fill the fields date range or ensure query!")
						.addClass("filled");
					return 0;
				}
				else
				{
					$('#ensure-form').submit();
					return 1;
				}
			});
		}
		else
		{
			var range = validateRange(from, to, 0);
			if(range !== 1)
			{
				$('.invalid-form-error-message')
					.html("You must correctly fill the fields date range or ensure query!")
					.addClass("filled");
				return;
			}
			$('#ensure-form').submit();
		}
	});
});

function validateEnsureQuery(ensure_query)
{
	$.get('/topics-detail/alt_ensure_query',{
		ensure_query : ensure_query
	}, function(result){
		if( !result || result == (-1))
		{
			return 0;
		}
		else
		{
			return 1;
		}
	});
};
function validateRange(from, to, state)
{
	if(state === 1)
	{
		if(!from || !to || from >= to)
			return 0;
		else
			return 1;
	}
	else 
	{
		if(!from || !to)
		{
			return 1;
		}
		else
		{
			if(from >= to)
			{
				return 0;
			}
			else
			{
				return 1;
			}
		}
	}
}