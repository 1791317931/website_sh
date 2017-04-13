$(function() {
	
	var $productList = $('#product-list'),
	$productModal = $('#product-modal'),
	$propertyModal = $('#property-modal'),
	$categoryModal = $('#category-modal'),
	$categoryList = $('#category-list'),
	$propertyList = $('#property-list'),
	$productPropertyContainer = $('#product-property-container');
	
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
			$productModal.trigger('show');
		});
		
		$('#select-category').bind('click', function() {
			$categoryModal.trigger('show');
		});
		
		$productModal.ToggleModal(function() {
			
		}, function() {
			
		});
		
		$categoryModal.ToggleModal(function() {
			$categoryList.pagination({
				url : base_url + 'category/page',
				columns : [{
					id : 'name',
					title : '分类名称',
					width : '50%'
				}, {
					title : '操作',
					width : '50%',
					render : function(row) {
						var id = row.id,
						html = '<span class="for-edit to-property" data-id="' + id + '">查看属性</span>'
							+ '<span class="for-edit ml10 choose-category" data-name="' + row.name + '" data-id="' + id + '">选择该属性分类</span>';
						return html;
					}
				}]
			});
		}, function() {
			
		});
		
		$categoryList.on('click', '.to-property', function() {
			var categoryId = $(this).attr('data-id');
			$.ajax({
				url : base_url + 'category/property/list',
				data : {
					categoryId : categoryId
				},
				success : function(result) {
					var list = result.data || [],
					html = '';
					
					for (var i = 0, length = list.length; i < length; i++) {
						var item = list[i],
						property = item.property || {},
						is_must = property.is_must == 'Y',
						name = property.name || '';
						html += '<div class="form-group col-4">'
								+ '<label class="label-5">' + name + '</label>'
								+ '<div class="form-control">'
									+ '<input type="text" readonly />'
								+ '</div>'
								+ '<span class="must' + (is_must ? '' : ' hide') + '">*</span>'
							+ '</div>';
					}
					$propertyList.html(html);
					$propertyModal.trigger('show');
				}
			});
		});
		
		$categoryList.on('click', '.choose-category', function() {
			var $this = $(this),
			categoryId = $this.attr('data-id'),
			name = $this.attr('data-name');
			
			// 先对比属性分类id，如果不同就替换
			if($('#product-category').attr('data-id') == categoryId) {
				$categoryModal.trigger('hide');
				return false;
			}
			
			$('#product-category').val(name).attr('data-id', categoryId);
			$.ajax({
				url : base_url + 'category/property/list',
				data : {
					categoryId : categoryId
				},
				success : function(result) {
					var list = result.data || [],
					html = '';
					
					for (var i = 0, length = list.length; i < length; i++) {
						var item = list[i],
						property = item.property || {},
						is_must = property.is_must == 'Y',
						name = property.name || '';
						html += '<div class="form-group col-4">'
								+ '<label class="label-5">' + name + '</label>'
								+ '<div class="form-control">'
									+ '<input type="text" data-is-must="' + property.is_must + '" data-id="' + property.id + '" />'
								+ '</div>'
								+ '<span class="must' + (is_must ? '' : ' hide') + '">*</span>'
							+ '</div>';
					}
					
					$productPropertyContainer.html(html);
				}
			});
			$categoryModal.trigger('hide');
		});
		
		$propertyModal.ToggleModal($.noop, function() {
			$propertyList.empty();
		});
		
		$('#close-property-modal').bind('click', function() {
			$propertyModal.trigger('hide');
		});
	})();
	
});