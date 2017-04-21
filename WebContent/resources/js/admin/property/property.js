$(function() {
	
	var $propertyList = $('#property-list');
	$propertyList.pagination({
		url : base_url + 'property/page',
		columns : [{
			id : 'name',
			title : '属性名称',
			width : '50%'
		}, {
			title : '属性分类',
			width : '20%',
			render : function(row, value) {
				return row.con.description;
			}
		}, {
			id : 'is_must',
			title : '是否必填',
			width : '10%',
			render : function(row, value) {
				return value == 'Y' ? '是' : '否';
			}
		}, {
			title : '操作',
			width : '20%',
			render : function(row, value) {
				var is_valid = row.is_valid == 'Y',
				id = row.id,
				typeId = row.con.id;
				return '<label class="for-edit edit" data-name="' + row.name + '" data-must="' + row.is_must + '" data-id="' + id + '" data-typeId="' + typeId + '">编辑</label>'
					+ '<label class="ml10 for-edit update-status" data-id="' + id + '">' + (is_valid && '置为无效' || '置为有效') + '</label>';
			}
		}]
	});
	
	$propertyList.on('click', '.edit', function() {
		var $this = $(this),
		name = $this.attr('data-name'),
		id = $this.attr('data-id'),
		is_must = $this.attr('data-must'),
		typeId = $this.attr('data-typeId');
		$('#name').val(name);
		$categoryList.val(typeId);
		$('input[name="is_must"]').each(function(index, item) {
			var $radio = $(item);
			if($radio.val() == is_must) {
				$radio.prop('checked', true);
			}
		});
		$('#propertyId').val(id);
		$('#add-property').click();
	});
	
	$propertyList.on('click', '.update-status', function() {
		var propertyId = $(this).attr('data-id');
		$.ajax({
			url : base_url + 'property/count',
			data : {
				propertyId : propertyId
			},
			success : function(result) {
				if(result.data > 0) {
					ZUtil.error('该属性已经被使用，无法删除');
				} else {
					deleteByPropertyId(propertyId);
				}
			}
		});
	});
	
	function deleteByPropertyId(propertyId) {
		$.ajax({
			url : base_url + 'property/delete',
			type : 'post',
			data : {
				propertyId : propertyId
			},
			success : function(result) {
				if(result.success) {
					ZUtil.success('数据删除成功');
					$propertyList.trigger('reload');
				}
			}
		});
	}
	
	var $categoryList = $('#category-list');
	$.ajax({
		url : base_url + 'const/list',
		data : {
			type : 'property'
		},
		success : function(result) {
			var list = result.data,
			html = '';
			for(var i = 0, length = list.length; i < length; i++) {
				var item = list[i];
				html += '<option value="' + item.id + '">' + item.description + '</option>';
			}
			$categoryList.html(html);
		}
	});
	
	var $propertyModal = $('#property-modal'),
	$propertyForm = $('#property-form');
	$propertyModal.ToggleModal($.noop, function() {
		$('#propertyId').val('');
		// 重置表单
		$propertyForm[0].reset();
	});
	
	$('#add-property').bind('click', function() {
		$propertyModal.trigger('show');
	});
	
	$('#save').bind('click', function() {
		var name = $.trim($('#name').val());
		if(!name) {
			ZUtil.error('属性名称必填');
			return false;
		} else if (name.length > 20) {
			ZUtil.error('属性名称最多20个字符');
			return false;
		}
		var typeId = $categoryList.val(),
		is_must = $('input[name="is_must"]:checked').val();
		id = $('#propertyId').val(),
		obj = {
			name : name,
			is_must : is_must,
			typeId : typeId
		};
		if(id) {
			obj.id = id;
		}
		
		saveOrUpdate(obj);
	});
	
	$('#cancel').bind('click', function() {
		$propertyModal.trigger('hide');
	});
	
	function saveOrUpdate(obj) {
		$.ajax({
			url : base_url + 'property/saveOrUpdate',
			type : 'post',
			data : obj,
			success : function(result) {
				if(result.success) {
					if(obj.id) {
						ZUtil.success('数据修改成功');
					} else {
						ZUtil.success('数据保存成功');
					}
					$propertyModal.trigger('hide');
					$propertyList.trigger('reload');
				}
			}
		});
	}
	
});