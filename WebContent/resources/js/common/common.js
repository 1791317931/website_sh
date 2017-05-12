// 分页查询课程
function loadList(param) {
	var $container = param.container,
	opt = {
		url : base_url + 'product/page/byParam',
		type : 'post',
		success : function(result) {
			var list = result.data.list || [],
			html = '';
			for (var i = 0, length = list.length; i < length; i++) {
				var product = list[i],
				id = product.id,
				name = product.name,
				count = product.count,
				price = product.price,
				urls = product.imgUrls || [];
				html += '<div class="product-item">'
						+ '<a href="' + base_url + 'product/user/detail?id=' + id + '" target="_blank">'
							+ '<img src="' + base_img + urls[0] + '" />'
						+ '</a>'
						+ '<div class="p5 product-desc">'
							+ '<p class="tf product-name">' + name + '</p>'
							+ '<div class="clearfix product-extral">'
								+ '<span class="pull-left tf col-6">库存:' + count + '</span>'
								+ '<span class="pull-right text-right tf col-6 product-price">' + price + '(￥)</span>'
							+ '</div>'
						+ '</div>'
					+ '</div>';
			}
			$container.append(html);
		}
	};
	
	opt = $.extend(true, opt, param);
	
	$container.empty();
	$container.Scroll(opt);
}