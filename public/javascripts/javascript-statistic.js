function onMultiChange(frm, newState, arryId){
	window.event.preventDefault();
	var announcement = "These elemtnes (";
	var nCount 		 = 0;

	var arrayID		 = $(arryId);
	var nElement	 = arrayID.length;

	for(var i = 0; i < nElement; i++){
		if($(arrayID[i]).is(':checked')){
			if(nCount != 0)
				announcement += ", ";
			announcement += $(arrayID[i]).val();
			nCount++;
		}
	}

	if(nCount > 0){
		var newState = $(newState).val();
		announcement += ") will be changed to " + newState + ", right?";
		
		$("#myModal").on('show.bs.modal',function(e){
			$("div.modal-body").text(announcement);
		}).modal('show');
		
		$("#SaveModalState").one('click', function(evt){
			$("#myModal").modal('hide');
			$(frm).submit();
		});
	}
};


function onBtnAplyAllClick(frm, oldState, srcState, destState, total)
{	
	window.event.preventDefault();
	var newState = $(srcState).val();
	var oldState = $(oldState).val();

	if(oldState.indexOf('UPDATING') == -1 && oldState.indexOf('CRAWLING') == -1){
		$("#myModal").on('show.bs.modal',function(e){
			$("div.modal-body").text(total + " elements will be changed to " + newState + ", right?");
		}).modal('show');

		$("#SaveModalState").one('click', function(evt){
			$(destState).val(newState);
			$("#myModal").modal('hide');
			$(frm).submit();
		});
	}
};

function applyAllPendingDomain(total)
{	
	window.event.preventDefault();
	var approvedChange = $("#approvedChange").val();
	var typeAllApproved = $("#typeAll").val();
	
	if(!typeAllApproved){
	$("#myModal").on('show.bs.modal',function(e){
			$("h4.modal-title").text("Error!!!");
			$("div.modal-body").text("Please choose type for apply all !");
			$("#SaveModalState").hide();
		}).modal('show');
		return;
	};
	$("#myModal").on('show.bs.modal',function(e){
		var text = "";
		if(approvedChange == 1) {
			text = 'YES';
		} else if(approvedChange == 0) {
			text = 'NO';
		} else {
			text = 'CANCEL';
		}
		$("h4.modal-title").text("Warning!!!");
		$("div.modal-body").text(total + " domains will be approved to " + text + " - " + typeAllApproved + ", right?");
		$("#SaveModalState").show();
	}).modal('show');

	$("#SaveModalState").one('click', function(evt){
		$("#applyNewApproved").val(approvedChange);
		$("#typeAllApproved").val(typeAllApproved);
		$("#myModal").modal('hide');
		$("#updateAll").submit();
	});
};

function onBtChangeElementsStatus(frm, newState, destState){
	window.event.preventDefault();
	$("#myModal").on('show.bs.modal',function(e){
		$("div.modal-body").text(total + " elements will be changed to " + newState + ", right?");
	}).modal('show');

	$("#SaveModalState").one('click', function(evt){
		$(destState).val(newState);
		$("#myModal").modal('hide');
		$("frm").submit();
	});
};

function forumCheckLinkChangeState(newState){
	$("#myModal").on('show.bs.modal',function(e){
		$("div.modal-body").text("Your link will be changed to " + newState + ", right?");
	}).modal('show');

	$("#SaveModalState").one('click', function(evt){
		$("input#itemNewState").val(newState);
		$("#myModal").modal('hide');
		$("form#LinkChangeItemState").submit();
	});
};

$("#save_edit_solr").click(function(event){
	var content = $("div#content").html();
	$("textarea#search_content").val(content);
	$("form#formUpdateSolr").submit();
});

$("#resetDomain").click(function(event){
	$("#myModal").on('show.bs.modal',function(e){
		$("div.modal-body").text("Are you reset category, right?");
	}).modal('show');

	$("#SaveModalState").one('click', function(evt){
		$("#myModal").modal('hide');
		$("#resetCategory").submit();
	});
});

function itemSubmitOnClick(id, domain, newState){
	$("#myModal").on('show.bs.modal',function(e){
		$("div.modal-body").text("Element (" + id + " - " + domain +") will be changed to " + newState + ", right?");
	}).modal('show');

	$("#SaveModalState").one('click', function(evt){
		$("input#itemID").val(id);
		$("input#itemNewState").val(newState);
		$("#myModal").modal('hide');
		$("#ChangeItemState").submit();
	});
};

function changeApprovedClick(id, domain, newApproved, oldApproved){
	$("#myModal").on('show.bs.modal',function(e){
		$("h4.modal-title").text("Warning!!!");
		$("#SaveModalState").show();
		var text = "";
		if(newApproved == 1) {
			text = 'YES';
		} else if(newApproved == 0) {
			text = 'NO';
		} else {
			text = 'CANCEL';
		}
		$("div.modal-body").text("Domain [" + domain +"] will be approved to " + text + ", right?");
	}).modal('show');

	$("#SaveModalState").one('click', function(evt){
		$("input#itemID").val(id);
		$("input#itemType").val($("#typeDomain_" + id).val());
		$("input#itemNewApproved").val(newApproved);
		$("input#itemOldApproved").val(oldApproved);
		$("#myModal").modal('hide');
		$("#ChangeItemApproved").submit();
	});
};

function changeDeployed(id, domain){
	$("#myModal").on('show.bs.modal',function(e){
		$("h4.modal-title").text("Warning!!!");
		$("#SaveModalState").show();
		var val = $("#deployDomain_" + id).val();
		var text = "";
		if(val == 0) {
			text = "NO";
		} else if(val == 1) {
			text = "PATTERN";
		} else {
			text = "DEPLOY";
		}		
		$("div.modal-body").text("Domain [" + domain +"] will change status to " + text + ", right?");
	}).modal('show');

	$("#SaveModalState").one('click', function(evt){
		$("input#itemID").val(id);
		$("input#itemDomain").val(domain);
		$("input#itemNewDeployed").val($("#deployDomain_" + id).val());
		$("#myModal").modal('hide');
		$("#ChangeItemApproved").submit();
	});
};

$("#MultiChange").click(function(event){
	event.preventDefault();
	var announcement = "These categories (";
	var nCount 		 = 0;

	var arrayID		 = $("input.subCheck");
	var arrayName	 = $("input.category_name");
	var nElement	 = arrayID.length;

	for(var i = 0; i < nElement; i++){
		if($(arrayID[i]).is(':checked')){
			
			if(nCount != 0)
				announcement += ", ";
			announcement += $(arrayID[i]).val() + " - " +  $(arrayName[i]).val();
			nCount++;
		}
	}

	if(nCount > 0){
		var frm 	 = $(this).parents("form");
		var newState = $("#stateChange").val();
		announcement += ") will be changed to " + newState + ", right?";
		
		$("#myModal").on('show.bs.modal',function(e){
			$("div.modal-body").text(announcement);
		}).modal('show');
		
		$("#SaveModalState").one('click', function(evt){
			$("#myModal").modal('hide');
			frm.submit();
		});
	}
});

$("#MultiChangePending").click(function(event){
	event.preventDefault();
	var announcement = "These domains [";
	var nCount 		 = 0;

	var arrayID		 = $("input.subCheck");
	var arrayName	 = $("input.domain_name");
	var nElement	 = arrayID.length;
	
	for(var i = 0; i < nElement; i++){		
		if($(arrayID[i]).is(':checked')){			
			if($("#typeDomain_" + $(arrayID[i]).val()).val() === 'UNKNOWN') {
				$("#myModal").on('show.bs.modal',function(e){
					$("h4.modal-title").text("Error!!!");
					$("div.modal-body").text("Please choose type for all domains !");
					$("#SaveModalState").hide();
				}).modal('show');
				return;
			}
			if(nCount != 0)
				announcement += ", ";
			announcement += $(arrayName[i]).val();
			nCount++;
		}
	}

	if(nCount > 0){
		var frm 	 = $(this).parents("form");
		var approvedChange = $("#approvedChange").val();
		var text = "";
		if(approvedChange == 1) {
			text = 'YES';
		} else if(approvedChange == 0) {
			text = 'NO';
		} else {
			text = 'CANCEL';
		}
		announcement += "] will be approved to " + text + ", right?";
		
		$("#myModal").on('show.bs.modal',function(e){
			$("h4.modal-title").text("Warning!!!");
			$("#SaveModalState").show();
			$("div.modal-body").text(announcement);
		}).modal('show');
		
		$("#SaveModalState").one('click', function(evt){
			$("#myModal").modal('hide');
			frm.submit();
		});
	}
});

function onChangeState(state, failed_type){
	var el_state = $(state);
	var el_failed_type = $(failed_type);
	el_failed_type.removeClass('hidden');
	if(el_state.val() === 'FAILURE') {		
		el_failed_type.show();
	} else {
		el_failed_type.hide();
	}
	return onSearchAdvance();
};

function onLoadChangeState(state, failed_type){
	var el_state = $(state);
	var el_failed_type = $(failed_type);
	el_failed_type.removeClass('hidden');
	if(el_state.val() === 'FAILURE') {		
		el_failed_type.show();
	} else {
		el_failed_type.hide();
	}
};

function onChangeSort(frm_sort){
	var frm 	 = $(frm_sort);
	frm.submit();
};

function onSearchSimple(q_search){
	var el 	 = $(q_search);
	var	q 	= $("#q").val();
	el.val("");
	if(!q || isNaN(q) || parseFloat(q) < 0){
		$("#myModal").on('show.bs.modal',function(e){
			$("h4.modal-title").text("Error!!!");
			$("div.modal-body").text("Please provide number over zero in id source field");
			$("#SaveModalState").hide();
		}).modal('show');
		return false;
	}
};

function onSearchAdvance(){
	var	q 	= $("#q").val();
	var	el_idc 	= $("#idc");
	if(!q || isNaN(q) || parseFloat(q) < 0){
		$("#myModal").on('show.bs.modal',function(e){
			$("h4.modal-title").text("Error!!!");
			$("div.modal-body").text("Please provide number over zero in id source field");
			$("#SaveModalState").hide();
		}).modal('show');
		return false;
	}
	if(el_idc) {
		var idc = el_idc.val().trim();
		if(idc) {
			if(isNaN(idc) || parseFloat(idc) < 0){
				$("#myModal").on('show.bs.modal',function(e){
					$("h4.modal-title").text("Error!!!");
					$("div.modal-body").text("Please provide number over zero in id category field");
					$("#SaveModalState").hide();
				}).modal('show');
				return false;
			}
		}
	}
};

var lastChecked = null;

$(document).ready(function() {
	var $chkboxes = $('.subCheck');
	$chkboxes.click(function(e) {
		if(!lastChecked) {
			lastChecked = this;
			return;
		}

		if(e.shiftKey) {
			var start = $chkboxes.index(this);
			var end = $chkboxes.index(lastChecked);

			$chkboxes.slice(Math.min(start,end), Math.max(start,end)+ 1).prop('checked', lastChecked.checked);

		}

		lastChecked = this;
	});
});

function testPatternNews(type, domain, url) {
	if(type === 'url') {
		var link = "http://104.156.49.173/news_test?action=url&domain=" + domain + "&proxy=0&url=" + encodeURI(url);
		window.open(link);
	}
	if(type === 'detail') {
		var link = "http://104.156.49.173/news_test?action=detail&domain=" + domain + "&proxy=0&url=" + encodeURI(url);
		window.open(link);
	}
}

function testPatternForum(type, domain, url) {
	if(type === 'url') {
		var link = "http://104.156.49.173/forum_test?action=url&domain=" + domain + "&proxy=1&url=" + encodeURI(url);
		window.open(link);
	}
	if(type === 'detail') {
		var link = "http://104.156.49.173/forum_test/?action=detail&domain=" + domain + "&proxy=1&url=" + encodeURI(url);
		window.open(link);
	}
}
