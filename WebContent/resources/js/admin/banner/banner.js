$(function() {
	
	var $bannerModal = $('#banner-modal'),
	$bannerList = $('#bannerList'),
	$sortModal = $('#sort-modal'),
	typeId;
	
	(function() {
		$.ajax({
			url : base_url + 'const/get',
			data : {
				type : 'file',
				code : 4
			},
			success : function(result) {
				var data = result.data || {};
				typeId = data.id;
			}
		});
		
		
		$bannerList.Scroll({
			url : base_url + 'attachment/page/vo',
			data : {
				type : 'file',
				code : 4,
				orderBy : 'wao.sort',
				pageSize : 8
			},
			success : function(result) {
				var data = result.data,
				currentPage = data.currentPage,
				list = data.list || [],
				html = '';
				if (currentPage == 1) {
					$bannerList.empty();
				}
				
				for (var i = 0, length = list.length; i < length; i++) {
					var item = list[i],
					attachmentId = item.id,
					isActive = item.objId == 0,
					sort = item.sort;
					html += '<div class="item-banner" data-id="' + attachmentId + '">'
							+ '<img src="' + base_img + item.path + '" />'
							+ '<div class="banner-desc">'
								+ '<div>'
									+ '状态:<span class="ml5' + (isActive ? ' active' : ' not-active') + '">' + (isActive ? '已启用' : '未启用') + '</span>'
									+ '<div class="for-edit pull-right banner-operation">' + (isActive ? '禁用' : '启用') + '</div>'
								+ '</div>'
								+ '排序:<span class="ml5">' + (sort ? sort : '暂无') + '</span>'
								+ '<span class="pull-right for-edit edit-sort" data-sort="' + (sort ? sort : '') + '">设置排序</span>'
							+ '</div>'
							+ '<div class="close" title="删除"></div>'
						+ '</div>';
				}
				$bannerList.append(html);
			}
		});
	})();
	
	(function() {
		$bannerModal.ToggleModal($.noop, function() {
			$bannerModal.trigger('reset');
		});
		
		$('#add-banner').bind('click', function() {
			$bannerModal.trigger('show');
		});
		
		$('.cancel-btn').bind('click', function() {
			$bannerModal.trigger('hide');
		});
		
		$bannerModal.ClipImage({
			fullscreenContainer : $bannerModal,
			saveCallback : function(data) {
				$.ajax({
					url : base_url + 'attachment/saveOrUpdate',
					type : 'post',
					data : {
						path : data.imgPath,
						typeId : typeId
					},
					success : function(result) {
						ZUtil.success('图片上传成功');
						$bannerList.trigger('reload');
					}
				});
			}
		});
		
		$bannerList.on('click', '.banner-operation', function() {
			var $this = $(this),
			$itemBanner = $this.closest('.item-banner'),
			attachmentId = $itemBanner.attr('data-id');
			if ($itemBanner.find('.active').length) {
				$.ajax({
					url : base_url + 'attachment/banner/disable',
					data : {
						attachmentId : attachmentId
					},
					success : function(result) {
						ZUtil.success('数据修改成功');
						$bannerList.trigger('reload');
					}
				});
			} else {
				$.ajax({
					url : base_url + 'attachment/banner/saveOrUpdate',
					data : {
						attachmentId : attachmentId
					},
					success : function(result) {
						if (result.data.success) {
							ZUtil.success('数据修改成功');
							$bannerList.trigger('reload');
						} else {
							ZUtil.error(result.data.msg);
						}
					}
				});
			}
		});
		
		$sortModal.ToggleModal($.noop, function() {
			$('#attachment-id').val('');
			$('#sort').val('');
		});
		
		$bannerList.on('click', '.edit-sort', function() {
			var $this = $(this),
			$itemBanner = $this.closest('.item-banner');
			$('#sort').val($this.attr('data-sort'));
			$('#attachment-id').val($itemBanner.attr('data-id'));
			$sortModal.trigger('show');
		});
		
		$bannerList.on('click', '.close', function() {
			var attachmentId = $(this).closest('.item-banner').attr('data-id');
			$.ajax({
				url : base_url + 'attachment/banner/delete',
				data : {
					attachmentId : attachmentId
				},
				success : function(result) {
					if (result.data.success) {
						ZUtil.success('数据删除成功');
						$bannerList.trigger('reload');
					} else {
						ZUtil.error(result.data.msg);
					}
				}
			});
		});
		
		$('#sort-sure').bind('click', function() {
			var attachmentId = $('#attachment-id').val(),
			sort = $.trim($('#sort').val()),
			reg = /^[1-9]\d*$/;
			
			if (!reg.test(sort)) {
				ZUtil.error('排序值不合法，请输入大于0的整数');
				return false;
			}
			$.ajax({
				url : base_url + 'attachment/banner/updateSort',
				data : {
					attachmentId : attachmentId,
					sort : sort
				},
				success : function(result) {
					if (result.data.success) {
						ZUtil.success('数据修改成功');
						$bannerList.trigger('reload');
						$sortModal.trigger('hide');
					} else {
						ZUtil.error(result.data.msg);
					}
				}
			});
		});
		
		$('#sort-cancel').bind('click', function() {
			$sortModal.trigger('hide');
		});
		
	})();
	
});