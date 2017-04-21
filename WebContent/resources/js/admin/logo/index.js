$(function() {
	var $logoList = $('#logo_list');
	
	// init data
	(function() {
		$logoList.Scroll({
			url : base_url + 'attachment/page',
			data : {
				type : 'file',
				code : 3
			},
			success : function(result) {
				var html = '',
				list = result.data.list || [];
				for (var i = 0, length = list.length; i < length; i++) {
					var item = list[i];
					html += '<div class="pull-left server-image">'
							+ '<img src="' + (base_url + item.path) + '" data-url="' + item.path + '" />'
						+ '</div>';
				}
				$logoList.append(html);
			}
		});
	})();
	
	// init bind
	(function() {
		
	})();
});