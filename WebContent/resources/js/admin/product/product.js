$(function() {
	
	var $searchName = $('#search-name'),
	$searchCode = $('#search-code'),
	$productList = $('#product-list'),
	$productModal = $('#product-modal'),
	$propertyContainer = $('#product-property-container'),
	$imgContainer = $('#img-container'),
	// N（新增）、P（审核通过）、F（审核失败）、S（特价处理中）
	statusObj = {
		N : '新增',
		P : '审核通过',
		F : '审核失败',
		S : '特价处理中'
	};
	
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
				width : '20%'
			}, {
				id : 'status',
				title : '状态',
				width : '10%',
				render : function(row, value) {
					return statusObj[value];
				}
			}, {
				id : 'price',
				title : '价格（￥）',
				width : '10%'
			}, {
				id : 'update_date',
				title : '最后操作日期',
				width : '15%'
			}, {
				title : '操作',
				width : '20%',
				render : function(row) {
					var html = '<div class="text-center">'
								+ '<span class="for-edit to-detail" data-id="' + row.id + '">查看 </span>'
								+ '<span class="for-edit to-edit ml10" data-id="' + row.id + '">编辑 </span>'
								+ '<span class="for-edit delete ml10" data-id="' + row.id + '">删除 </span>'
							+ '</div>';
					return html;
				}
			}]
		});
		
	})();

	// bind
	(function() {
		$('#search-product').bind('click', function() {
			var name = $searchName.val(),
			code = $searchCode.val();
			$productList.trigger('reload', {
				name : name,
				code : code
			});
		});
		
		$('#add-product').bind('click', function() {
			$.ajax({
				url : base_url + 'product/admin/toEdit',
				success : function(result) {
					$('#content-body').html(result);
				}
			});
		});
		
		function renderForm(result) {
			var data = result.data || {},
			propertyHtml = '',
			imgHtml = '';
			
			// 基本属性
			$('#product-name').val(data.name);
			$('#product-code').val(data.code);
			$('#product-price').val(data.price);
			$('#product-special-price').val(data.specialPrice);
			$('#product-is-valid').val(data.status);
			$('#product-count').val(data.count);
			$('#category-name').val(data.categoryName);
			
			// 自定义属性
			var propertyObjs = data.propertyObjs;
			for (var i = 0, length = propertyObjs.length; i < length; i++) {
				var vo = propertyObjs[i];
				is_must = vo.iSmust == 'Y',
				name = vo.name || '';
				propertyHtml += '<div class="form-group col-4">'
								+ '<label class="label-5">' + name + ':</label>'
								+ '<div class="form-control r10">'
									+ '<input type="text" readonly value="' + vo.value + '" />'
								+ '</div>'
								+ '<span class="must' + (is_must ? '' : ' hide') + '">*</span>'
							+ '</div>';
			}
			$propertyContainer.html(propertyHtml);
			
			// 图片
			var imgUrls = data.imgUrls;
			for (var i = 0, length = imgUrls.length; i < length; i++) {
				imgHtml += '<div class="image-item">'
							+ '<img src="' + base_img + imgUrls[i] + '" />'
						+ '</div>';
			}
			$imgContainer.html(imgHtml);
		}
		
		$productList.on('click', '.to-detail', function() {
			var id = $(this).attr('data-id');
			$.ajax({
				url : base_url + 'product/detail',
				data : {
					id : id
				},
				success : function(result) {
					renderForm(result);
					$productModal.trigger('show');
				}
			});
		});
		
		$productList.on('click', '.to-edit', function() {
			$.ajax({
				url : base_url + 'product/admin/toEdit',
				data : {
					id : $(this).attr('data-id')
				},
				success : function(result) {
					$('#content-body').html(result);
				}
			});
		});
		
		$productList.on('click', '.delete', function() {
			$.ajax({
				url : base_url + 'product/delete',
				type : 'post',
				data : {
					id : $(this).attr('data-id')
				},
				success : function(result) {
					ZUtil.success('删除成功');
					$productList.trigger('reload', {
						currentPage : 1
					});
				}
			});
		});
		
		$('#save-cancel').bind('click', function() {
			$productModal.trigger('hide');
		});
		
		$productModal.ToggleModal($.noop, function() {
			$('#readonly-form').get(0).reset();
			$imgContainer.empty();
		});
		
	})();
});