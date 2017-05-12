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
			
			loadList({
				data : data,
				container : $productList
			});
		});
		
		$searchProduct.click();
		
	})();
});