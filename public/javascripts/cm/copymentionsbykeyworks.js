/* global io */

$(document).ready(function(){
    var nCopied = 0;
    var nExist  = 0;
    $("#idtopic").select2({
        ajax: {
            delay: 250,
            dataType: 'json',
            url: '/topics/search',
            data: function (params) {
                var queryParameters = {
                    q: params.term
                };
                return queryParameters;
            },
            processResults: function (data) {
                return {
                    results: data
                };
            }
        },
        minimumInputLength : 2,
        placeholder: "Select a Topic",
        allowClear: false
    });
    var host    = window.location.host;
    var socket  = io.connect(host);
    $('#review').click(function(e){
        e.preventDefault();
        var paramObj    = {};
        $.each($('#forminput').serializeArray(), function(_, kv) {
            paramObj[kv.name] = kv.value;
        });
        if(!paramObj.keywords || !paramObj.idtopic || paramObj.idtopic==='undefined' || !paramObj.shards)
        {
            $('#message').text('Vui lòng nhập keywords, topic và shards!');
        }
        else
        {
            $.get('/copy-mentions-by-keywords/review-copy',{
                paramObj : paramObj
            }, function(result){
                swal({
                    title: "Cảnh báo!",
                    text: "Nhấn copy nếu chắc chắn copy "+result+" mentions vào topic "+paramObj.idtopic+ "!",
                    imageUrl: "images/denied.png"
                });
            });
        }
    });
    $('#copy').click(function(e){
        e.preventDefault();
        nCopied         = 0;
        nExist          = 0;
        var paramObj    = {};
        $.each($('#forminput').serializeArray(), function(_, kv) {
            paramObj[kv.name] = kv.value;
        });
        if(!paramObj.keywords || !paramObj.idtopic || paramObj.idtopic==='undefined' || !paramObj.shards)
        {
            $('#message').text('Vui lòng nhập keywords, topic và shards!');
        }
        else
        {
            $('#message').text('Đợi chút đang copy!');
        	socket.emit('copy-mention', paramObj);
	        $('.progress-bar').css('width', '0%');
	        $('.progress-bar').text('0%');
	        $('#copied').html('');
	        $('#exist').html('');
	        $('#numberCopied').text('(0)');
	        $('#numberExist').text('(0)');
        }
    });
    socket.on('copy-mention', function (data) {
        if( data.type === 'progress' )
        {
            $('.progress-bar').css('width', data.value + '%');
            $('.progress-bar').text(data.value + '%');
            if(data.copied && data.copied.length)
            {
            	$('#copied').append(data.copied.join(', ') + '<br />');
            	nCopied +=data.copied.length
            	$('#numberCopied').text('('+nCopied+')');
            }
            if(data.exist && data.exist.length)
            {
            	$('#exist').append(data.exist.join(', ') + '<br />');
            	nExist += data.exist.length
            	$('#numberExist').text('('+nExist+')');
            }
        }
        else if( data.type === 'info' || data.type === 'error' )
        {
            $('#message').text(data.message);
        }
    });
});

