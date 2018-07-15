$(function() {

	var $banner = $('#banner'),
	$bannerFooter = $('#banner-footer'),
	$productList = $('#product-list');
	
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
						html += '<div class="slid-item pull-left" data-id="' + item.id + '">'
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
		
		function renderContainer($container, typeId) {
			$.ajax({
				url : base_url + 'product/list/byParam',
				data : {
					typeId : typeId
				},
				success : function(result) {
					var list = result.data || [],
					html = '';
					for (var i = 0, length = list.length; i < length; i++) {
						var product = list[i],
						id = product.id,
						name = product.name,
						count = product.count,
						price = product.price,
						urls = product.imgUrls || [];
						html += '<div class="product-item">'
								+ '<a href="' + base_url + 'product/user/detail?id=' + id + '">'
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
			});
			
		}
		
		function getProducts(typeObjs) {
			for (var i = 0, length = typeObjs.length; i < length; i++) {
				var obj = typeObjs[i],
				id = obj.id,
				name = obj.description,
				html = '<div class="mb30">'
						+ '<h4 class="mb10 title">' + name + '</h4>'
						+ '<div class="product-category empty clearfix" data-empty="暂无商品"></div>'
					+ '</div>';
				
				$productList.append(html);
				var $productContainer = $productList.find('.product-category:last-child');
				renderContainer($productContainer, id);
			}
		}
		
		$.ajax({
			url : base_url + 'const/list',
			data : {
				type : 'product_category'
			},
			success : function(result) {
				var categorys = result.data || [];
				
				getProducts(categorys);
			}
		});
		
	})();
	
});