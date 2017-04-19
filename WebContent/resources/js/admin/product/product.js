$(function() {
	
	var $productList = $('#product-list'),
	$productModal = $('#product-modal'),
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
		$('#add-product').bind('click', function() {
			
		});
		
		$productList.on('click', '.to-detail', function() {
			var id = $(this).attr('data-id');
			$.ajax({
				url : base_url + 'product/detail',
				data : {
					id : id
				},
				success : function(result) {
					// 回显数据
					$productModal.trigger('show');
				}
			});
		});
		
		$productModal.ToggleModal($.noop, function() {
			
		});
		
	})();
});