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
				return '<span>编辑</span>';
			}
		}]
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
		$('#category-name').val('');
		$categoryOptions.val($categoryOptions.find('option').eq(0).attr('value'));
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
							+ '<div class="form-control' + (is_must ? ' is-must' : '') + '">'
								+ '<div class="form-close" title="删除"></div>'
								+ '<input type="text" data-id="' + propertyId + '" />'
							+ '</div>'
							+ (is_must ? '<span class="must">*</span>' : '')
						+ '</div>';
				}
			});
			$propertyContainer.append(html);
			$propertyModal.trigger('hide');
		}
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
	
});