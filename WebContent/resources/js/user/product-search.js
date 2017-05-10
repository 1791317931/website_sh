$(function() {
	
	var $productName = $('#product-name'),
	$productNameSearch = $('#product-name-search'),
	$categoryContainer = $('.category-container'),
	$searchProduct = $('.search-product'),
	$productList = $('.product-list'),
	$minPrice = $('#min-price'),
	$maxPrice = $('#max-price');
	
	(function() {
		$productNameSearch.val($.trim($productName.val()));
		
		$.ajax({
			url : base_url + 'const/list',
			data : {
				type : 'product_category'
			},
			success : function(result) {
				var list = result.data,
				length = list.length,
				html = '';
				
				for (var i = 0; i < length; i++) {
					var item = list[i];
					html += '<label id="' + item.id + '">'
								+ item.value
							+ '</label>';
				}
				$categoryContainer.html(html);
			}
		});
	})();
	
	(function() {
		$categoryContainer.on('click', 'label', function() {
			var $this = $(this);
			if ($this.hasClass('active')) {
				$this.removeClass('active');
			} else {
				$this.siblings('label').removeClass('active');
				$this.addClass('active');
			}
			$searchProduct.click();
		});
		
		$minPrice.bind('keyup blur paste', function() {
			if (isNaN($minPrice.val())) {
				$minPrice.val('');
			}
		});
		
		$maxPrice.bind('keyup blur paste', function() {
			if (isNaN($maxPrice.val())) {
				$maxPrice.val('');
			}
		});
		
		$searchProduct.unbind().bind('click', function() {
			var name = $.trim($productNameSearch.val()),
			categoryId = $categoryContainer.find('label.active').attr('id'),
			minPrice = $.trim($minPrice.val()),
			maxPrice = $.trim($maxPrice.val()),
			data = {
				currentPage : 1,
				pageSize : 10
			};
			
			if (name) {
				data.name = name;
			}
			if (categoryId) {
				data.categoryId = categoryId;
			}
			if (!isNaN(minPrice)) {
				data.minPrice = minPrice;
			}
			if (!isNaN(maxPrice)) {
				data.maxPrice = maxPrice;
			}
			$productList.empty();
			
			$productList.Scroll({
				url : base_url + 'product/page/byParam',
				data : data,
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
					$productList.append(html);
				}
			});
			
		});
		
		$searchProduct.click();
		
	})();
});