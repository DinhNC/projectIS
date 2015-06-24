
$( document ).ready(function() {	
	$('.inline-edit').editable({
		type 	: 'textarea',
		mode	: 'inline',
		url 	: '/sentiment/attributesdictionary/update',
		title	: 'Edit row',
        success : function(response, newValue) {
            if(!response.success) return response.msg;
            location.reload();
        },
        error   : function(response, newValue) {
            if(response.status === 500) {
                return 'Please try change format text.';
            } else {
                return response.responseText;
            }
        }
	});

	$('.inline-is-active').editable({
        prepend: "--Selected--",
        source: [
            {value: 1, text: 'Enable'},
            {value: 0, text: 'Disable'}
        ],
        mode	: 'inline',
        url 	: '/sentiment/attributesdictionary/is_active',
        title	: 'Edit row',
        success: function(response, newValue) {
            if(!response.success) return response.msg;
            location.reload();
        }
    });

    $('.edit-negative-id').editable({
        mode	: 'inline',
        source	: classifySelect($('.edit-negative-id').data('all')),
        url 	: '/sentiment/attributesdictionary/update_sentiment_id',
        title	: 'Selected',
        success: function(response, newValue) {
            if(!response.success) return response.msg;
            location.reload();
        }
    });

    $('.edit-positive-id').editable({
        mode	: 'inline',
        source	: classifySelect($('.edit-positive-id').data('all')),
        url 	: '/sentiment/attributesdictionary/update_sentiment_id',
        title	: 'Selected',
        success: function(response, newValue) {
            if(!response.success) return response.msg;
            location.reload();
        }
    });

    $('.edit-neutral-id').editable({
        mode	: 'inline',
        source	: classifySelect($('.edit-neutral-id').data('all')),
        url 	: '/sentiment/attributesdictionary/update_sentiment_id',
        title	: 'Selected',
        success: function(response, newValue) {
            if(!response.success) return response.msg;
            location.reload();
        }
    });
});

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
		temp.value 	= data[i].id;
		temp.text 	= data[i].id + ' - ' +data[i].name;
		storage.push(temp);
	}
	return storage;
}