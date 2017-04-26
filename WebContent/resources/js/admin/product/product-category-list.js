$(function() {
	
	var $categoryContainer = $('#category-container'),
	$categorys = $('#categorys'),
	categorys = [],
	$search = $('#search'),
	$edit = $('#edit'),
	$categoryModal = $('#category-modal'),
	$selectProductList = $('#select-product-list');
	
	function getProducts(typeObjs) {
		// 每次都要清空$categoryContainer
		$categoryContainer.empty();
		for (var i = 0, length = typeObjs.length; i < length; i++) {
			var obj = typeObjs[i],
			id = obj.id,
			name = obj.value,
			html = '<div class="title">' + name + '</div>'
				+ '<div class="product-list empty" data-empty="暂无商品" data-id="' + id + '"></div>';
			
			$categoryContainer.append(html);
			var $productContainer = $categoryContainer.find('.product-list:last-child');
			(function($container) {
				$.ajax({
					url : base_url + 'product/list/byTypeId',
					data : {
						typeId : id
					},
					success : function(result) {
						var products = result.data || [];
					}
				});
			})($productContainer);
		}
	}
	
	(function() {
		// 先获取所有商品分类
		$.ajax({
			url : base_url + 'const/list',
			async : false,
			data : {
				type : 'product_category'
			},
			success : function(result) {
				categorys = result.data || [];
				var options = '';
				
				for (var i = 0, length = categorys.length; i < length; i++) {
					var category = categorys[i],
					id = category.id,
					name = category.value;
					options += '<option value="' + category.id + '">' + name + '</option>';
				}
				
				$categorys.append(options);
				getProducts(categorys);
			}
		});
	})();
	
	(function() {
		$categoryModal.ToggleModal($.noop, function() {
			/*$('#category-name').html('');
			$('#typeId').val('');
			$selectProductList.trigger('clear');*/
		});
		
		$edit.bind('click', function() {
			$categoryModal.trigger('show');
			/*var id = $categorys.val();
			if (!id) {
				ZUtil.error('请选择商品分类');
			} else {
				var $option = $categorys.find('option:selected');
				$('#category-name').html($option.html());
				$('#typeId').val(id);
				$categoryModal.trigger('show');
				$selectProductList.pagination({
					url : base_url + 'product/page/simple',
					data : {
						valid : 'Y'
					},
					columns : [{
						id : 'id',
						checkbox : true,
						width : '5%'
					}, {
						id : 'name',
						title : '商品名称',
						width : '30%'
					}, {
						id : 'price',
						title : '价格（￥）',
						width : '15%'
					}, {
						id : 'count',
						title : '库存',
						width : '20%',
					}, {
						id : 'update_date',
						title : '最后修改日期',
						width : '30%'
					}],
					callback : function(list) {
//						var 
					}
				});
			}*/
		});
	})();
});