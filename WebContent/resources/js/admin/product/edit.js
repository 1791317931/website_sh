$(function() {
	
	var $propertyModal = $('#property-modal'),
	$categoryModal = $('#category-modal'),
	$categoryList = $('#category-list'),
	$propertyList = $('#property-list'),
	$productPropertyContainer = $('#product-property-container'),
	$imgContainer = $('#img-container'),
	$imageModal = $('#image-modal'),
	$imageListModal = $('#image-list-modal'),
	$imageList = $('#image-list'),
	$imgAdd = $('#img-add'),
	id = $('#product-id').val();
	
	// init data
	(function() {
		
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
			$('#product-category').val(data.categoryName).attr('data-id', data.categoryId);
			
			// 自定义属性
			var propertyObjs = data.propertyObjs;
			for (var i = 0, length = propertyObjs.length; i < length; i++) {
				var vo = propertyObjs[i],
				propertyId = vo.propertyId,
				is_must = vo.isMust == 'Y',
				name = vo.name || '';
				propertyHtml += '<div class="form-group col-4">'
								+ '<label class="label-5">' + name + ':</label>'
								+ '<div class="form-control">'
									+ '<input type="text" data-is-must="' + vo.isMust + '" data-id="' + propertyId + '" value="' + vo.value + '" />'
								+ '</div>'
								+ '<span class="must' + (is_must ? '' : ' hide') + '">*</span>'
							+ '</div>';
			}
			$productPropertyContainer.html(propertyHtml);
			
			// 图片
			var imgUrls = data.imgUrls;
			for (var i = 0, length = imgUrls.length; i < length; i++) {
				var url = imgUrls[i];
				imgHtml += '<div class="image-item">'
							+ '<img src="' + base_url + url + '" data-url="' + url + '" />'
							+ '<div class="image-item-close"></div>'
						+ '</div>';
			}
			$imgContainer.prepend(imgHtml);
		}
		
		if (id) {
			$.ajax({
				url : base_url + 'product/detail',
				data : {
					id : id
				},
				success : function(result) {
					renderForm(result);
				}
			});
		}
	})();
	
	// init bind
	(function() {
		$('#select-category').bind('click', function() {
			$categoryModal.trigger('show');
		});
		
		$categoryModal.ToggleModal(function() {
			$categoryList.pagination({
				url : base_url + 'category/page',
				data : {
					typeId : 8
				},
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
		});
		
		$('#close-category-modal').bind('click', function() {
			$categoryModal.trigger('hide');			
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
								+ '<label class="label-5">' + name + ':</label>'
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
		
		$imgAdd.bind('click', function() {
			$imageModal.trigger('show');
		});
		
		// 删除图片
		$imgContainer.on('click', '.image-item-close', function() {
			$(this).closest('.image-item').remove();
		});
		
		$imageModal.ClipImage({
			fullscreenContainer : $imageModal,
			saveCallback : function(data) {
				var url = data.imgPath,
				html = '<div class="image-item">'
						+ '<img src="' + base_url + url + '" data-url="' + url + '" />'
						+ '<div class="image-item-close"></div>'
					+ '</div>';
				$imgAdd.before(html);
				$imageModal.trigger('hide');
				$imageModal.trigger('reset');
			}
		});
		
		$imageModal.ToggleModal();
		
		$('#select-img-from-source').bind('click', function() {
			$imageListModal.trigger('show');
		});
		
		$('.cancel-btn').bind('click', function() {
			$imageModal.trigger('hide');
		});
		
		$imageListModal.ToggleModal(function() {
			$imageList.Scroll({
				self : true,
				url : base_url + 'attachment/page',
				data : {
					type : 'file',
					code : 2
				},
				success : function(result) {
					var html = '',
					list = result.data.list || [];
					for (var i = 0, length = list.length; i < length; i++) {
						var item = list[i];
						html += '<div class="pull-left server-image">'
								+ '<img src="' + (base_url + item.path) + '" data-url="' + item.path + '" />'
							+ '</div>';
					}
					$imageList.append(html);
				}
			});
		}, function() {
			$imageList.empty();
		});
		
		// 单击
		$imageListModal.on('click', '.server-image', function() {
			var $this = $(this);
			if ($this.hasClass('active')) {
				$this.removeClass('active');
			} else {
				$this.siblings('.server-image').removeClass('active');
				$this.addClass('active');
			}
		});
		
		// 双击
		$imageListModal.on('dblclick', '.server-image', function() {
			var $this = $(this);
			$('.source-image').trigger('change', {
				prefix : base_url,
				path : $this.find('img').attr('data-url')
			});
			$imageListModal.trigger('hide');
		});
		
		$('#sure-image-list-modal').bind('click', function() {
			var $item = $imageListModal.find('.server-image.active');
			if (!$item.length) {
				ZUtil.error('请选择一个图片');
			} else {
				$('.source-image').trigger('change', {
					prefix : base_url,
					path : $item.find('img').attr('data-url')
				});
				$imageListModal.trigger('hide');
			}
		});
		
		$('#close-image-list-modal').bind('click', function() {
			$imageListModal.trigger('hide');
		});
		
		function validate(data) {
			if (!data.name) {
				ZUtil.error('商品属性必填');
				return false;
			}
			if (!data.price) {
				ZUtil.error('价格必填');
				return false;
			}
			if (!data.specialPrice) {
				ZUtil.error('特价必填');
				return false;
			}
			if (!data.count) {
				ZUtil.error('商品库存必填');
				return false;
			}
			return true;
		}
		
		// 保存商品
		$('#saveOrUpdate').bind('click', function() {
			var productId = $('#product-id').val(),
			productName = $.trim($('#product-name').val()),
			price = $.trim($('#product-price').val()),
			specialPrice = $.trim($('#product-special-price').val()),
			count = $.trim($('#product-count').val()),
			categoryId = $('#product-category').attr('data-id'),
			$propertyInputs = $productPropertyContainer.find('input'),
			$imgs = $('#img-container .image-item img'),
			propertyObjs = [],
			imgUrls = [],
			productObj = {
				name : productName,
				price : price,
				specialPrice : specialPrice,
				count : count,
				categoryId : categoryId
			};
			
			if (!validate(productObj)) {
				return false;
			}
			
			if (!$propertyInputs.length) {
				ZUtil.error('请选择一个分类属性');
				return false;
			}
			
			for (var i = 0, length = $propertyInputs.length; i < length; i++) {
				var $input = $propertyInputs.eq(i),
				isMust = $input.attr('data-is-must') == 'Y',
				propertyId = $input.attr('data-id'),
				value = $.trim($input.val());
				if (isMust) {
					if (!value) {
						ZUtil.error('请填写所有必填属性');
						return false;
					}
				}
				propertyObjs.push({
					propertyId : propertyId,
					value : value
				});
			}
			if (!$imgs.length) {
				ZUtil.error('请至少上传一张图片');
				return false;
			}
			$imgs.each(function(index, img) {
				imgUrls.push($(img).attr('data-url'));
			});
			if (productId) {
				productObj.id = productId;
			}
			productObj.imgUrls = imgUrls;
			productObj.propertyObjs = propertyObjs;
			
			saveOrUpdate(productObj);
		});
		
		function saveOrUpdate(productObj) {
			$.ajax({
				url : base_url + 'product/saveOrUpdate',
				data : JSON.stringify(productObj),
				type : 'post',
				datatype : 'json',
				contentType : 'application/json;charset=utf-8',
				success : function(result) {
					if (productObj.id) {
						ZUtil.success('数据修改成功');
					} else {
						ZUtil.success('数据保存成功');
					}
					reloadList();
				}
			});
		}
		
		function reloadList() {
			$.ajax({
				url : base_url + 'product/admin/index',
				success : function(result) {
					$('#content-body').html(result);
				}
			});
		}
		
	})();
	
});