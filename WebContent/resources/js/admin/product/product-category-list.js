$(function() {
	
	var $categoryContainer = $('#category-container'),
	$categorys = $('#categorys'),
	$categorysList = $('#categorys-list'),
	$search = $('#search'),
	$edit = $('#edit'),
	$chooseProduct = $('#choose-product'),
	$categoryModal = $('#category-modal'),
	$selectProductList = $('#select-product-list'),
	$productModal = $('#product-modal'),
	$PList = $('#p-list'),
	$productListSure = $('#product-list-sure'),
	$productListCancel = $('#product-list-cancel');
	
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
				var categorys = result.data || [],
				options = '';
				
				for (var i = 0, length = categorys.length; i < length; i++) {
					var category = categorys[i],
					id = category.id,
					name = category.value;
					options += '<option value="' + category.id + '">' + name + '</option>';
				}
				
				$categorys.append(options);
				$categorysList.html(options);
				getProducts(categorys);
			}
		});
	})();
	
	(function() {
		$categoryModal.ToggleModal($.noop, function() {
			$('#category-form').get(0).reset();
			$selectProductList.trigger('clear');
		});
		
		$edit.bind('click', function() {
			$categoryModal.trigger('show');
		});
		
		$chooseProduct.bind('click', function() {
			$productModal.trigger('show');
		});
		
		$('#save-sure').bind('click', function() {
			
		});
		
		$('#save-cancel').bind('click', function() {
			$categoryModal.trigger('hide');
		});
		
		$productModal.ToggleModal(function() {
			$PList.pagination({
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
					// 标记已经选择的商品
				}
			});
		});
		
		// 确定选择的商品
		$productListSure.bind('click', function() {
			
		});
		
		$productListCancel.bind('click', function() {
			$productModal.trigger('hide');
			$PList.trigger('clear');
		});
		
	})();
});