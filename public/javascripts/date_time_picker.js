Date.prototype.toStringMySQLFormat = function()
{
	return this.getUTCFullYear() + '-' +
					('00' + (this.getUTCMonth()+1)).slice(-2) + '-' +
					('00' + this.getUTCDate()).slice(-2) + ' ' + 
					('00' + this.getUTCHours()).slice(-2) + ':' + 
					('00' + this.getUTCMinutes()).slice(-2) + ':' + 
					('00' + this.getUTCSeconds()).slice(-2);
};

$(document).ready(function(){
	$('.action-edit-page').click(function(e){
			var row         = $(this).data("item");
			var categories  = $(this).data("item2");
			$(edit_id_social).val(row.id_social);
			$('#edit_user_name').val(row.username);
			$('#edit_name').val(row.name);
			// var pageType = $(this).closest('tr').find('.item-type').data('type');
			$('#edit_type').val(row.is_community || '0');
			$('#edit_language').val([row.language]);
			$('#edit_fans').val(row.fans);
			$('#edit_last_post').val(new Date(row.last_post_created*1000).toStringMySQLFormat());
			$('#edit_categories').val(row.category_path);

			/* Remove all options from the select list */
			var x = document.getElementById("edit_categories");

			/* Insert the new ones from the array above */
			for (var i = 0; i < categories.length; i++) {
					var option = document.createElement("option");

					if(categories[i].id_parent == null){
							option.style.fontWeight = "bold";
							option.text = categories[i].name;
							option.value = categories[i].path;
							x.add(option);
					}
					else{
							option.style.marginLeft = "25px";
							option.text = categories[i].name;
							option.value = categories[i].path;
							x.add(option);
					}
					if(row.category_path == categories[i].path){
							x.selectedIndex = i+1;
					}
			};
	});

	$('.action-edit-groups').click(function(e){
			var row = $(this).data("item");
			var categories  = $(this).data("item2");
			$('#edit_id_social').val(row.id_social);
			$('#edit_user_name').val(row.description);
			$('#edit_name').val(row.name);
			// var groupType = $(this).closest('tr').find('.item-type').data('type');
			$('#edit_type').val(row.is_closed || '0');
			$('#edit_language').val([row.language]);
			$('#edit_fans').val(row.fans);
			$('#edit_last_post').val(new Date(row.last_post_created*1000).toStringMySQLFormat());

			/* Remove all options from the select list */
			var x = document.getElementById("edit_categories");

			/* Insert the new ones from the array above */
			for (var i = 0; i < categories.length; i++) {
					var option = document.createElement("option");

					if(categories[i].id_parent == null){
							option.style.fontWeight = "bold";
							option.text = categories[i].name;
							option.value = categories[i].path;
							x.add(option);
					}
					else{
							option.style.marginLeft = "25px";
							option.text = categories[i].name;
							option.value = categories[i].path;
							x.add(option);
					}
					if(row.category_path == categories[i].path){
							x.selectedIndex = i+1;
					}
			};
	});
	$('.export').click(function(e){
			var count  = $(this).data("item");
			if(count > 1000){
				sweetAlert("Warning...", "Found more than 5000 result, but this feature only exports first 5000th. ", "error");
			}
	});
	$("#language, #language2").select2({
			placeholder: "Select a Language",
			allowClear: true
	});

	// Show modal Edit
	$('#edit_data').on('shown.bs.modal', function () {
		if( $(this).data('select2IsCalled') ) {
		return;
		}
		$(this).data('select2IsCalled', 1);

		$("#edit_language").select2({
			allowClear: true,
			placeholder: "Select Language",
		});
	});

	jQuery(function(){
	 jQuery('#from,#to').datetimepicker({
		format:'Y-m-d',
		onShow:function( ct ){
		 this.setOptions({
			
		 })
		},
			timepicker:false
	 });
	});
});
