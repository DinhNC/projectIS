//hàm test_empty dùng để kiếm tra giá trị đầu vào text có rỗng hay không
function test_empty(text)
{
	if(text=="")
	{
		return true;
	}
	else
	{
		return false;
	}
}
// hàm dùng checkFormEmpty dùng để kiểm tra xem form đã được nhập đầy đủ thông yêu cầu hay không
// hàm có giá trị vào arrayExceptions là mảng có giá trị được bỏ qua khi check form với thuộc tính name
function checkFormEmpty(arrayExceptions) {
	var arrayType = new Array("input","textarea");
	for(var i=0;i<arrayType.length;i++) {
		var id = document.getElementsByTagName(arrayType[i]);
		for(var j=0;j<id.length;j++) {
			var flag = 0;
			if(arrayType[i]=='input') {
				if(id[j].getAttribute('type')=='text') {
					for(var k=0;k<arrayExceptions.length;k++) {
						if(id[j].getAttribute('name')==arrayExceptions[k]) {
							flag = 1;
						}
					}
				}
			}
			else {
				for(var k=0;k<arrayExceptions.length;k++) {
					if(id[j].getAttribute('name')==arrayExceptions[k]) {
						flag = 1;	
					}
				}	
			}
			if(flag==0) {
				if(test_empty(id[j].value)) {
					alert('Dữ liệu còn trống');
					id[j].focus();
					return false;
				}
			}
		}
	}
}
//hàm cleanForm dùng để xóa toàn bộ dữ liệu trong form bao gồm text và textarea 
function cleanForm() {
	var arrayType = new Array("input","textarea");
	for(var i=0;i<arrayType.length;i++) {
		var id = document.getElementsByTagName(arrayType[i]);
		for(var j=0;j<id.length;j++) {
			if(arrayType[i]=='input') {
				if(id[j].getAttribute('type')=='text') {
					id[j].value = "";
				}
			}
			else {
				id[j].value = "";	
			}
		}
	}
}
//hàm setValueSelectTag dùng để chỉnh giá trị của tag select theo id
function setValueSelectTag(id,value) {
	var selectTag = document.getElementById(id);
	selectTag.value = value;
}
// Brower back history
function back() {
	window.history.back();
}
//go to URL
function goTo(URL) {
	window.location = URL;
}
//set action form
function setActionForm(formId, action) {
	var form = document.getElementById(formId);
	form.setAttribute("action",action);
}

// get now datetime
function getDateTimeNow() {
	var now = new Date();
	return now.format("dd/M/yy h:mm tt");
}

function confirmMsg(msg) {
	if(confirm(msg)) {
		return true;
	}
	return false;
}

//hàm confirm sau đó go to đến một URL
// msg : string
// url : string, example : http://www.google.com
function confirmGoToURL(msg, url) {
	if(confirm(msg)) {
		window.location = url;
		return true;
	}
	return false;
}

// submit form 
// idForm : string
function submitFormById(idForm) {
	var form = document.getElementById(idForm);
	form.submit();
}

//function check checkbox has checked
function checkCBox() {
	var input 	= document.getElementsByTagName("input");
	for(var i = 0; i < input.length; i++)
	{
		if(input[i].getAttribute("type") === "checkbox") {
			if( input[i].checked )
			{
				return true;
			}
		}
	}
	alert("Bạn chưa chọn bất kỳ phần tử nào !!!");
	return false; 
}