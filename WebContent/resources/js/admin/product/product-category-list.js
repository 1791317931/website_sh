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
	$productListCancel = $('#product-list-cancel'),
	// 现有的productIds
	productIds = [];
	
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
						// TODO
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
		$categoryModal.ToggleModal(function() {
			$selectProductList.pagination({
				url : base_url + 'product/list/byParam',
				data : {
					typeId : $categorysList.val(),
					pageSize : 1000
				},
				pagination : false,
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
					id : 'update_date',
					title : '最后修改日期',
					width : '30%'
				}, {
					title : '操作',
					width : '20%',
					render : function(row) {
						return '<span class="for-edit to-remove" data-id="' + row.id + '">删除</span>';
					}
				}],
				callback : function(result) {
					var list = result.list || [];
					for (var i = 0, length = list.length; i < length; i++) {
						productIds.push(list[i].id);
					}
				}
			});
		}, function() {
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
				rowClick : true,
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
				callback : function(result) {
					var list = result.list || [];
					$PList.find('.page-body-content-row').each(function(index, item) {
						// 回显数据
						var $item = $(item),
						data = list[index];
						// .page-body-content-row缓存数据
						$item.data('data', data);
						if (productIds.indexOf(data.id) != -1) {
							$item.addClass('active');
							$item.find('input[type="checkbox"]').prop('checked', true);
						}
					});
				},
				// 每次切换页码之前执行
				beforeChangePage : dealCurrentPage
			});
		}, function() {
			$PList.trigger('clear');
		});
		
		$productModal.on('click', '.to-remove', function() {
			// TODO
		});
		
		// 确定选择的商品
		$productListSure.bind('click', function() {
			dealCurrentPage();
			$productModal.trigger('hide');
			$selectProductList.trigger('reload', {
				ids : productIds
			});
		});
		
		$productListCancel.bind('click', function() {
			$productModal.trigger('hide');
		});
		
		function dealCurrentPage() {
			// 遍历分页中所有数据
			$PList.find('.page-body-content-row').each(function(index, item) {
				var $this = $(item),
				product = $this.data('data'),
				id = product.id,
				flag = $this.hasClass('active'),
				i = productIds.indexOf(id);
				
				// 如果原本有
				if (i != -1) {
					// 被删除
					if (!flag) {
						// 移除
						productIds.splice(i, 1);
					}
				} else {
					// 添加
					if (flag) {
						productIds.push(id);
					}
				}
			});
		}
		
	})();
});