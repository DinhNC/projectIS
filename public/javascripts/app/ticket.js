$(document).ready(function(){

	$('input:radio[name=ticket_for]').change(function (){
		var checked_option_radio = $('input:radio[name=ticket_for]:checked').val();
    	if(checked_option_radio == 'topic')
    	{
    		$('#form-group-topic').show();
    		$('#form-group-project').hide();
    	}	
    	else
    	{
    		$('#form-group-project').show();
    		$('#form-group-topic').hide();
    	}
	}).change();
    

    $( "#type" ).change(function () {
		var str = "";
		$( "#type option:selected" ).each(function() {
			str += $(this).text();

			if( str == 'COPY_DATA')
			{
				$('#form-group-link').hide();
				$('#form-group-time').show();
			}
			else
				if( str == 'COPY_MENTIONS')
				{
					$('#form-group-time').hide();
					$('#form-group-link').show();
				}
				else
				{
					$('#form-group-time').hide();
					$('#form-group-link').hide();
				}
		});
	}).change();


    
	$('#from, #to').datetimepicker({
		format:'Y-m-d',
		onShow:function( ct ){
	 		this.setOptions({
	 		})
	    },
      	timepicker:false
   	});
   	$('#deadline').datetimepicker({
		format:'Y-m-d',
		onShow:function( ct ){
	 		this.setOptions({
	 			minDate:0 //Today
	 		})
	    },
      	timepicker:false
   	});

   	$("#id_topic, #assignee, #id_project").select2({
		allowClear: true
	});

   	$('#create-ticket-form').validator();
}); 
