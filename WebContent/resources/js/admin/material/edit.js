$(function() {
	
	var $propertyModal = $('#property-modal'),
	$categoryModal = $('#category-modal'),
	$categoryList = $('#category-list'),
	$propertyList = $('#property-list'),
	$materialPropertyContainer = $('#material-property-container'),
	$imgContainer = $('#img-container'),
	$imageModal = $('#image-modal'),
	$imageListModal = $('#image-list-modal'),
	$imageList = $('#image-list'),
	$imgAdd = $('#img-add'),
	id = $('#material-id').val(),
	$uploadFileContainer = $('.upload-file-container');
	
	// init data
	(function() {
		
		function renderForm(result) {
			var data = result.data || {},
			propertyHtml = '',
			imgHtml = '';
			
			// 基本属性
			$('#material-name').val(data.name);
			$('#material-code').val(data.code);
			$('#material-price').val(data.price);
			$('#material-special-price').val(data.specialPrice);
			$('#material-is-valid').val(data.status);
			$('#material-count').val(data.count);
			$('#material-category').val(data.categoryName).attr('data-id', data.categoryId);
			
			// 自定义属性
			var propertyObjs = data.propertyObjs;
			for (var i = 0, length = propertyObjs.length; i < length; i++) {
				var vo = propertyObjs[i],
				propertyId = vo.propertyId,
				is_must = vo.isMust == 'Y',
				name = vo.name || '';
				propertyHtml += '<div class="form-group col-4">'
								+ '<label class="label-5">' + name + ':</label>'
								+ '<div class="form-control r10">'
									+ '<input type="text" data-is-must="' + vo.isMust + '" data-id="' + propertyId + '" value="' + vo.value + '" />'
								+ '</div>'
								+ '<span class="must' + (is_must ? '' : ' hide') + '">*</span>'
							+ '</div>';
			}
			$materialPropertyContainer.html(propertyHtml);
			
			// 图片
			var imgUrls = data.imgUrls;
			for (var i = 0, length = imgUrls.length; i < length; i++) {
				var url = imgUrls[i];
				imgHtml += '<div class="image-item">'
							+ '<img src="' + base_img + url + '" data-url="' + url + '" />'
							+ '<div class="close"></div>'
						+ '</div>';
			}
			$imgContainer.prepend(imgHtml);
			
			// 附件
			var $rowDivs = $uploadFileContainer.find('.z-upload-rows'),
			attachmentUrls = data.attachmentUrls,
			$addButton = $uploadFileContainer.find('.z-upload-add');
			for (var i = 0, length = attachmentUrls.length; i < length; i++) {
				var url = attachmentUrls[i],
				arr = url.substring(url.lastIndexOf('_') + 1).split('\.'),
				name = arr[0],
				type = arr[1],
				fileUpload = {
					path : url
				},
				innerHtml;
				if (i) {
					$addButton.click();
				}
				var $row = $rowDivs.find('.z-upload-row:last-child');
				$row.data('file', fileUpload);
				
				innerHtml = '<div class="z-file-name z-upload-cell">'+ name + '.' + type + '</div>'
						+ '<div class="z-upload-progress z-upload-cell">进度：100%</div>'
						+ '<div class="z-upload-speed z-upload-cell"></div>'
						+ '<div class="z-upload-progress-linear" style="width: 100%;"></div>';
				
				$row.find('.z-progress-bar').html(innerHtml);
			}
			
		}
		
		if (id) {
			$.ajax({
				url : base_url + 'material/detail',
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
					type : 'property',
					code : 2
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
								+ '<div class="form-control r10">'
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
			if($('#material-category').attr('data-id') == categoryId) {
				$categoryModal.trigger('hide');
				return false;
			}
			
			$('#material-category').val(name).attr('data-id', categoryId);
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
								+ '<div class="form-control r10">'
									+ '<input type="text" data-is-must="' + property.is_must + '" data-id="' + property.id + '" />'
								+ '</div>'
								+ '<span class="must' + (is_must ? '' : ' hide') + '">*</span>'
							+ '</div>';
					}
					
					$materialPropertyContainer.html(html);
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
		$imgContainer.on('click', '.close', function() {
			$(this).closest('.image-item').remove();
		});
		
		$imageModal.ClipImage({
			fullscreenContainer : $imageModal,
			saveCallback : function(data) {
				var url = data.imgPath,
				html = '<div class="image-item">'
						+ '<img src="' + base_img + url + '" data-url="' + url + '" />'
						+ '<div class="close"></div>'
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
					code : 1
				},
				success : function(result) {
					var html = '',
					list = result.data.list || [];
					for (var i = 0, length = list.length; i < length; i++) {
						var item = list[i];
						html += '<div class="pull-left server-image">'
								+ '<img src="' + (base_img + item.path) + '" data-url="' + item.path + '" />'
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
			
			var price = data.price,
			priceReg = /^(([1-9]\d*)|0)(\.\d{1,2})?$/;
			if (!price) {
				ZUtil.error('价格必填');
				return false;
			} else if (!priceReg.test(price)) {
				ZUtil.error('价格不能小于0，且最多保留两位小数');
				return false;
			}
			
			var specialPrice = data.specialPrice;
			if (!specialPrice) {
				ZUtil.error('特价必填');
				return false;
			} else if (!priceReg.test(specialPrice)) {
				ZUtil.error('特价不能小于0，且最多保留两位小数');
				return false;
			}
			
			var count = data.count,
			countReg = /^([1-9]\d*)|0$/;
			if (!count) {
				ZUtil.error('商品库存必填');
				return false;
			} else if (!countReg.test(count)) {
				ZUtil.error('商品库存只能大于或等于0的整数');
				return false;
			}
			return true;
		}
		
		// 保存商品
		$('#saveOrUpdate').bind('click', function() {
			var materialId = $('#material-id').val(),
			materialName = $.trim($('#material-name').val()),
			price = $.trim($('#material-price').val()),
			specialPrice = $.trim($('#material-special-price').val()),
			count = $.trim($('#material-count').val()),
			categoryId = $('#material-category').attr('data-id'),
			$propertyInputs = $materialPropertyContainer.find('input'),
			$imgs = $('#img-container .image-item img'),
			propertyObjs = [],
			imgUrls = [],
			fileUploads = [],
			attachmentUrls = [],
			materialObj = {
				name : materialName,
				price : price,
				specialPrice : specialPrice,
				count : count,
				categoryId : categoryId
			};
			
			if (!validate(materialObj)) {
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
			if (materialId) {
				materialObj.id = materialId;
			}
			materialObj.imgUrls = imgUrls;
			materialObj.propertyObjs = propertyObjs;
			
			var $rowDivs = $uploadFileContainer.find('.z-upload-row'),
			fileUploads = [];
			
			// 检测是否有文件
			$rowDivs.each(function(index, item) {
				var fileUpload = $(item).data('file');
				if(fileUpload) {
					fileUploads.push(fileUpload);
				}
			});
			
			if (!fileUploads.length) {
				ZUtil.error('请至少上传一个附件');
				return false;
			} else {
				for (var i = 0, length = fileUploads.length; i < length; i++) {
					attachmentUrls.push(fileUploads[i].path);
				}
			}
			materialObj.attachmentUrls = attachmentUrls;
			
			saveOrUpdate(materialObj);
		});
		
		function saveOrUpdate(materialObj) {
			$.ajax({
				url : base_url + 'material/saveOrUpdate',
				data : JSON.stringify(materialObj),
				type : 'post',
				datatype : 'json',
				contentType : 'application/json;charset=utf-8',
				success : function(result) {
					if (materialObj.id) {
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
				url : base_url + 'material/admin/index',
				success : function(result) {
					$('#content-body').html(result);
				}
			});
		}
		
		$uploadFileContainer.UploadFile({
			maxSize : 20,
			multiple : true,
			type : 'file',
			splitUpload : false,
			tip : '使用不大于20M的pdf,xls,xlsx,doc,docx,wps,zip,txt文件',
			uploadUrl : base_url + 'upload/attachment/upload'
		});
		
	})();
	
});