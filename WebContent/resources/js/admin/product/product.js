$(function() {
	
	var $productList = $('#product-list'),
	$productModal = $('#product-modal');
	
	// init data
	(function() {
		$productList.pagination({
			url : base_url + 'product/page',
			columns : [{
				id : 'name',
				title : '商品名称'
			}]
		});
		
	})();

	// bind
	(function() {
		$('#add-product').bind('click', function() {
			
		});
		
		$productModal.ToggleModal(function() {
			
		}, function() {
			// 关闭modal，重置
			$('#product-id').val('');
		});
		
	})();
});