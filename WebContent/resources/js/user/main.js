$(function() {

	var $banner = $('#banner'),
	$bannerFooter = $('#banner-footer');
	
	// 设置banner
	(function() {
		$.ajax({
			url : base_url + 'attachment/page/vo',
			data : {
				type : 'file',
				code : 4,
				sortBy : 'sort'
			},
			success : function(result) {
				var list = result.data.list || [],
				html = '',
				footerHtml = '',
				length = list.length,
				width = $('#banner-container').width(),
				// 每3秒执行一次动画
				INTERVAL = 3000,
				validLength = 0;
				
				for (var i = 0; i < length; i++) {
					var item = list[i];
					if (item.objId == 0) {
						html += '<div class="slid-item pull-left">'
								+ '<img src="' + base_img + item.path + '" />'
							+ '</div>';
						footerHtml += '<span></span>';
						validLength++;
					}
				}
				$banner.html(html).css({
					width : width * validLength
				});
				$bannerFooter.html(footerHtml);
				
				if (length) {
					var index = 0;
					(function() {
						translateX = index * width;
						$banner.css({
							transform : 'translateX(-' + translateX + 'px)'
						});
						$bannerFooter.find('span').removeClass('active').eq(index).addClass('active');
						index++;
						if (index == validLength) {
							index = 0;
						}
						setTimeout(arguments.callee, INTERVAL);
					})();
				}
			}
		});
	})();
	
});