$(function() {
	
	var $addProductCategory = $('#add-product-category'),
	$productCategoryList = $('#product-category-list'),
	$categoryEditModal = $('#category-edit-modal'),
	$productCategoryForm = $('#product-category-form'),
	$sure = $('#add-product-category-sure'),
	$cancel = $('#add-product-category-cancel'),
	TYPE = 'product_category';
	
	(function() {
		$productCategoryList.pagination({
			url : base_url + 'const/page',
			data : {
				type : TYPE
			},
			columns : [{
				id : 'value',
				title : '分类标识',
				width : '20%'
			}, {
				id : 'code',
				title : '分类编码',
				width : '20%'
			}, {
				id : 'description',
				title : '分类描述',
				width : '30%'
			}, {
				title : '操作',
				width : '30%',
				render : function(row, value) {
					var html = '<span class="for-edit to-edit" data-id="' + row.id + '">编辑</span>'
							+ '<span class="for-edit ml20 to-delete" data-id="' + row.id + '">删除</span>';
					return html;
				}
			}]
		});
		
	})();
	
	(function() {
		$productCategoryList.on('click', '.to-edit', function() {
			var $this = $(this),
			$tds = $this.closest('.page-body-content-row').find('.page-cell'),
			id = $this.attr('data-id');
			$('#category-id').val(id);
			$('#category-code').val($tds.eq(1).attr('title')),
			$.trim($('#category-value').val($tds.eq(0).attr('title'))),
			$.trim($('#category-desc').val($tds.eq(2).attr('title')));
			$categoryEditModal.trigger('show');
		});
		
		$productCategoryList.on('click', '.to-delete', function() {
			var id = $(this).attr('data-id');
			$.ajax({
				url : base_url + 'const/delete',
				type : 'post',
				data : {
					id : id
				},
				success : function(result) {
					if (!result.data.success) {
						ZUtil.error(result.data.msg);
					} else {
						ZUtil.success('数据删除成功');
						$productCategoryList.trigger('reload');
					}
				}
			});
		});
		
		$categoryEditModal.ToggleModal($.noop, function() {
			$('#category-id').val('');
			$productCategoryForm.get(0).reset();
		});
		
		$addProductCategory.bind('click', function() {
			$categoryEditModal.trigger('show');
		});
		
		$sure.bind('click', function() {
			saveOrUpdate();
		});
		
		function saveOrUpdate() {
			var id = $('#category-id').val(),
			code = $('#category-code').val(),
			value = $.trim($('#category-value').val()),
			desc = $.trim($('#category-desc').val()),
			reg = /^[1-9]\d*|0$/;
			
			if (!reg.test(code)) {
				ZUtil.error('分类编码只能是大于或等于0的整数');
				return false;
			} else if (code.length > 10) {
				ZUtil.error('分类编码最多10位');
				return false;
			}
			if (!value.length) {
				ZUtil.error('分类标识不能为空');
				return false;
			} else if (value.length > 20) {
				ZUtil.error('分类标识最多20个字符');
				return false;
			}
			if (!desc.length) {
				ZUtil.error('分类描述不能为空');
				return false;
			} else if (desc.length > 20) {
				ZUtil.error('分类描述最多20个字符');
				return false;
			}
			
			var data = {
				type : TYPE,
				code : code,
				value : value,
				description : desc,
				id : id
			};
			
			$.ajax({
				url : base_url + 'const/saveOrUpdate',
				data : data,
				type : 'post',
				success : function(result) {
					if (!result.data.success) {
						ZUtil.error(result.data.msg);
					} else {
						ZUtil.success('数据' + (id ? '修改' : '添加') + '成功');
						$productCategoryList.trigger('reload');
						$categoryEditModal.trigger('hide');
					}
				}
			});
		}
		
		$cancel.bind('click', function() {
			$categoryEditModal.trigger('hide');
		});
		
	})();
	
});