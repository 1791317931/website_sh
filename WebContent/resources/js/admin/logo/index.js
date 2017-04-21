$(function() {
	var $logoList = $('#logo_list'),
	$logoModal = $('#logo-modal'),
	typeId;
	
	// init data
	(function() {
		
		$.ajax({
			url : base_url + 'const/get',
			data : {
				type : 'file',
				code : 3
			},
			success : function(result) {
				var data = result.data || {};
				typeId = data.id;
			}
		});
		
		$logoList.Scroll({
			url : base_url + 'attachment/page/vo',
			data : {
				type : 'file',
				code : 3
			},
			success : function(result) {
				if (result.data.currentPage == 1) {
					$logoList.empty();
				}
				
				var html = '',
				list = result.data.list || [];
				for (var i = 0, length = list.length; i < length; i++) {
					var item = list[i],
					// objId = 0时，是启用状态
					isActive = item.objId == 0;
					html += '<div class="pull-left image-item" data-id="' + item.id + '">'
							+ '<img class="img" src="' + (base_url + item.path) + '" />'
							+ '<div class="item-desc clearfix">'
								+ '<div class="pull-left">'
									+ '状态:<span class="ml5 ' + (isActive ? 'active' : 'not-active') + '">' + (isActive ? '启用中' : '未启用') + '</span>'
								+ '</div>'
								+ '<span class="pull-right for-edit update-status">' + (isActive ? '禁用' : '启用') + '</span>'
							+ '</div>'
							+ '<div class="close"></div>'
						+ '</div>';
				}
				$logoList.append(html);
			}
		});
	})();
	
	// init bind
	(function() {
		
		$('#upload-logo').bind('click', function() {
			$logoModal.trigger('show');
		});
		
		$logoModal.ToggleModal($.noop, function() {
			$logoModal.trigger('reset');
		});
		
		$logoModal.ClipImage({
			fullscreenContainer : $logoModal,
			saveCallback : function(data) {
				$.ajax({
					url : base_url + 'attachment/saveOrUpdate',
					data : {
						path : data.imgPath,
						typeId : typeId
					},
					success : function(result) {
						ZUtil.success('图片上传成功');
						$logoList.trigger('reload');
					}
				});
			}
		});
		
		$logoList.on('click', '.update-status', function() {
			var $imageItem = $(this).closest('.image-item'),
			id = $imageItem.attr('data-id');
			if ($imageItem.find('.active').length) {
				$.ajax({
					url : base_url + 'attachment/logo/disable',
					success : function(result) {
						ZUtil.success('数据修改成功');
						$logoList.trigger('reload');
					}
				});
			} else {
				$.ajax({
					url : base_url + 'attachment/logo/enable',
					data : {
						attachmentId : id
					},
					success : function(result) {
						ZUtil.success('数据修改成功');
						$logoList.trigger('reload');
					}
				});
			}
		});
		
		$logoList.on('click', '.close', function() {
			var $this = $(this),
			$imageItem = $this.closest('.image-item'),
			id = $imageItem.attr('data-id');
			// 已启用的LOGO无法删除
			if ($imageItem.find('.active').length) {
				ZUtil.error('已启用的LOGO无法删除');
			} else {
				$.ajax({
					url : base_url + 'attachment/logo/delete',
					data : {
						attachmentId : id
					},
					success : function(result) {
						var data = result.data || {};
						if (!data.success) {
							ZUtil.error(data.msg);
						} else {
							ZUtil.success('删除成功');
							$logoList.trigger('reload');
						}
					}
				});
			}
		});
		
		$('.cancel-btn').bind('click', function() {
			$logoModal.trigger('hide');
		});
		
	})();
});