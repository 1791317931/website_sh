$(function() {
	var $searchUsername = $('#search-username'),
	$searchPhone = $('#search-phone'),
	$searchValid = $('#search-valid'),
	$searchStatus = $('#search-status'),
	$searchRole = $('#search-role');
	
	(function() {
		function initSelect($container, type) {
			$.ajax({
				url : base_url + 'const/list',
				data : {
					type : type
				},
				success : function(result) {
					var list = result.data || [],
					html = '';
					
					for (var i = 0, length = list.length; i < length; i++) {
						var item = list[i];
						html += '<option value="' + item.value + '">' + item.description + '</option>';
					}
					$container.append(html);
				}
			});
		}
		
		initSelect($searchRole, 'user_type');
		
		initSelect($searchStatus, 'user_status');
		
	})();
	
	(function() {
		
	})();
});