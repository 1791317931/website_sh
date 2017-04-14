$(function() {
	
	var $categoryList = $('#categoryList'),
	$categorySelect = $('#category-select'),
	$categoryOptions = $('#category-options'),
	$searchName = $('#category-name'),
	$searchCategory = $('#search-category'),
	$addCategory = $('#add-category'),
	$validList = $('#valid-list'),
	$categoryModal = $('#category-modal'),
	$propertyModal = $('#property-modal'),
	$propertyList = $('#property-list'),
	$selectPropertySure = $('#select-property-sure'),
	$selectPropertyCancel = $('#select-property-cancel'),
	$propertyContainer = $('#property-container'),
	$hideTypeId = $('#hide-type-id'),
	propertyIds = [];
	
	$categoryList.pagination({
		url : base_url + 'category/page',
		columns : [{
			id : 'name',
			title : '分类名称',
			width : '20%'
		}, {
			title : '类别',
			width : '10%',
			render : function(row, value) {
				return row.con.description;
			}
		}, {
			title : '操作',
			width : '20%',
			render : function(row) {
				var html = '<span class="for-edit edit" data-id="' + row.id + '">编辑</span>'
						+ '<span class="for-edit delete ml10" data-id="' + row.id + '">删除</span>';
				return html;
			}
		}]
	});
	
	$categoryList.on('click', '.edit', function() {
		$categoryModal.trigger('show');
		var categoryId = $(this).attr('data-id');
		
		$('#category-id').val(categoryId);
		$.ajax({
			url : base_url + 'category/property/list',
			data : {
				categoryId : categoryId
			},
			success : function(result) {
				var list = result.data || [],
				obj = list[0],
				category = obj.category,
				typeId = category.con.id,
				html = '';
				
				$('#name').val(category.name);
				$('#hide-type-id').val(typeId);
				$('#category-id').val(category.id);
				$categoryOptions.val(typeId);
				
				for(var i = 0, length = list.length; i < length; i++) {
					var propertyCategory = list[i],
					property = propertyCategory.property,
					propertyId = property.id,
					name = property.name,
					is_must = property.is_must == 'Y';
					propertyIds.push(propertyId + '');
					html += '<div class="form-group col-4 mb10">'
							+ '<label class="label-5">' + name + ':</label>'
							+ '<div class="form-control right-10">'
								+ '<input type="text" data-id="' + propertyId + '" readonly />'
								+ '<label class="form-close" title="删除"></label>'
							+ '</div>'
							+ (is_must ? '<span class="must">*</span>' : '')
						+ '</div>';
				}
				
				$propertyContainer.html(html);
			}
		});
	});
	
	$categoryList.on('click', '.delete', function() {
		var id = $(this).attr('data-id');
		$.ajax({
			url : base_url + 'category/property/delete',
			type : 'post',
			data : {
				categoryId : id
			},
			success : function(result) {
				if(result.success) {
					ZUtil.success('数据删除成功');
					$categoryList.trigger('reload');
				} else {
					ZUtil.error(result.data);
				}
			}
		});
	});
	
	$.ajax({
		url : base_url + 'const/list',
		data : {
			type : 'product'
		},
		success : function(result) {
			if(result.success) {
				var list = result.data || [],
				html = '';
				for(var i = 0, length = list.length; i < length; i++) {
					var item = list[i];
					html += '<option value="' + item.id + '">' + item.description + '</option>';
				}
				$categorySelect.append(html);
				$categoryOptions.append(html);
			}
		}
	});
	
	$searchCategory.bind('click', function() {
		var name = $.trim($searchName.val()),
		typeId = $categorySelect.val(),
		isValid = $validList.val(),
		data = {
			name : name,
			typeId : typeId,
			isValid : isValid
		};
		$categoryList.trigger('setData', data);
		$categoryList.trigger('reload');
	});
	
	$searchName.bind('keydown', function(e) {
		if(e.keyCode == 13) {
			$searchCategory.click();
		}
	});
	
	$categoryModal.ToggleModal($.noop, function() {
		$('#category-id').val('');
		$('#hide-type-id').val('');
		$('#name').val('');
		$categoryOptions.val($categoryOptions.find('option').eq(0).attr('value'));
		$propertyContainer.empty();
		propertyIds = [];
		$searchCategory.click();
	});
	
	$addCategory.bind('click', function() {
		$categoryModal.trigger('show');
	});
	
	$propertyModal.ToggleModal(function() {
		// 通过typeId获取属性列表
		var typeId = $categoryOptions.val();
		
		if($hideTypeId.val() != typeId) {
			propertyIds = [];
		}
		
		$propertyList.pagination({
			url : base_url + 'property/page',
			data : {
				typeId : typeId
			},
			columns : [{
				id : 'id',
				checkbox : true,
				width : '5%'
			}, {
				id : 'name',
				title : '属性名称',
				className : 'property-name',
				width : '65%'
			}, {
				title : '属性分类',
				width : '20%',
				render : function(row, value) {
					return row.con.description;
				}
			}, {
				title : '是否必填',
				width : '10%',
				className : 'is-must',
				render : function(row, value) {
					return (row.is_must == 'Y' ? '是' : '否') + '<span class="hide">' + row.is_must + '</span>';
				}
			}],
			callback : function(list) {
				$propertyList.find('.page-content-cell input[type="checkbox"]').each(function(index, checkbox) {
					var $checkbox = $(checkbox);
					if(propertyIds.indexOf($checkbox.val()) != -1) {
						$checkbox.prop('checked', true);
					}
				});
			}
		});
	}, function() {
		$propertyList.find('.page-content-cell input[type="checkbox"]').each(function(index, checkbox) {
			var $checkbox = $(checkbox);
			if(!$checkbox.prop('checked')) {
				$propertyContainer.find('input[data-id="' + $checkbox.val() + '"]').closest('.form-group').remove();
			}
		});
		$propertyList.empty();
	});
	
	$('#add-property').bind('click', function() {
		$propertyModal.trigger('show');
	});
	
	$selectPropertySure.bind('click', function() {
		$checkboxs = $propertyList.find('.page-content-cell input[type="checkbox"]:checked');
		if(!$checkboxs.length) {
			ZUtil.error('请至少选中一个属性');
		} else {
			var hideTypeId = $hideTypeId.val(),
			typeId = $categoryOptions.val();
			
			// 如果切换了typeId，需要清空#property-container的html
			if(hideTypeId && hideTypeId != typeId) {
				$propertyContainer.empty();
			}
			
			$hideTypeId.val(typeId);
			
			var html = '';
			$checkboxs.each(function(index, checkbox) {
				var $checkbox = $(checkbox),
				propertyId = $checkbox.val();
				// 已经选择的属性，不能重复添加
				if(propertyIds.indexOf(propertyId) == -1) {
					propertyIds.push(propertyId);
					var $row = $checkbox.closest('.page-body-content-row'),
					name = $row.find('.property-name').html(),
					is_must = $row.find('.is-must span').html() == 'Y';
					html += '<div class="form-group col-4 mb10">'
							+ '<label class="label-5">' + name + ':</label>'
							+ '<div class="form-control right-10">'
								+ '<input type="text" data-id="' + propertyId + '" readonly />'
								+ '<label class="form-close" title="删除"></label>'
							+ '</div>'
							+ (is_must ? '<span class="must">*</span>' : '')
						+ '</div>';
				}
			});
			$propertyContainer.append(html);
			$propertyModal.trigger('hide');
		}
	});
	
	$('#add-category-cancel').bind('click', function() {
		$categoryModal.trigger('hide');
	});
	
	$propertyContainer.on('click', '.form-close', function() {
		var $close = $(this);
		
		if($close.hasClass('disabled')) {
			return false;
		}
		
		var $row = $close.closest('.form-group'),
		propertyId = $row.find('input[type="text"]').attr('data-id'),
		index = propertyIds.indexOf(propertyId);
		propertyIds.splice(index, 1);
		$row.remove();
	});
	
	$selectPropertyCancel.bind('click', function() {
		$propertyModal.trigger('hide');
	});
	
	$('#add-category-sure').bind('click', function() {
		var name = $.trim($('#name').val()),
		typeId = $categoryOptions.val(),
		categoryId = $('#category-id').val();
		
		if(!name) {
			ZUtil.error('分类名称必填');
			return false;
		} else if (name.length > 20) {
			ZUtil.error('分类名称最多20个字符');
			return false;
		}
		
		var $inputs = $propertyContainer.find('input'),
		properties = [];
		if(!$inputs.length) {
			ZUtil.error('请至少选择一个属性');
			return false;
		}
		
		for(var i = 0, length = $inputs.length; i < length; i++) {
			var $input = $inputs.eq(i),
			propertyId = $input.attr('data-id');
			
			properties.push(propertyId);
		}
		
		var category = {
			name : name,
			typeId : typeId,
			propertyIds : properties.join(',')
		};
		
		if(categoryId) {
			category.id = categoryId;
		}
		
		saveOrUpdate(category);
		
	});
	
	function saveOrUpdate(category) {
		$.ajax({
			url : base_url + 'category/saveOrUpdate',
			type : 'post',
			data : category,
			success : function(result) {
				if(result.success) {
					if(category.id) {
						ZUtil.success('数据修改成功');
					} else {
						ZUtil.success('数据添加成功');
					}
					$categoryModal.trigger('hide');
				} else {
					ZUtil.error(result.data);
				}
			}
		});
	}
	
});