$(function() {
	
	var $productList = $('#product-list'),
	$productModal = $('#product-modal');
	
	// init data
	(function() {
		$productList.pagination({
			url : base_url + 'product/page/simple',
			columns : [{
				id : 'name',
				title : '商品名称',
				width : '20%'
			}, {
				id : 'code',
				title : '编码',
				width : '10%'
			}, {
				id : 'status',
				title : '状态',
				width : '5%',
				render : function(value) {
					return '状态';
				}
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