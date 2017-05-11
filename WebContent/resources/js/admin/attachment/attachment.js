// 删除功能还没有做
$(function() {
	
	var $categoryList = $('#category-list'),
	$categoryListSub = $('#category-list-sub');
	$.ajax({
		url : base_url + 'const/list',
		data : {
			type : 'file'
		},
		async : false,
		success : function(result) {
			var list = result.data,
			html = '<option value="-1">-请选择-</option>',
			subHtml = '';
			
			for(var i = 0, length = list.length; i < length; i++) {
				var item = list[i],
				fragment = '<option value="' + item.code + '" data-id="' + item.id + '">' + item.description + '</option>';
				html += fragment;
				subHtml += fragment;
			}
			$categoryList.html(html);
			$categoryListSub.html(subHtml);
		}
	});
	
	function reload() {
		var value = $categoryList.val(),
		data = {
			currentPage : 1
		};
		
		if(value != -1) {
			data.code = value;
		}
		
		$attachmentList.trigger('load', data);
	}
	
	$categoryList.bind('change', function() {
		reload();
	});
	
	var $attachmentList = $('#attachment_list');
	$scroll = $attachmentList.Scroll({
		url : base_url + 'attachment/page',
		data : {
			type : 'file'
		},
		success : function(data) {
			var page = data.data,
			list = page.list || [],
			html = '';
			for(var i = 0, length = list.length; i < length; i++) {
				var item = list[i];
				html += '<div class="pull-left relative img-item">'
						+ '<img class="src-img" src="' + base_img + item.path + '" />'
						+ '<div class="img-desc">'
							+ '<div class="lh24">所属分类:<span class="ml5 red">' + item.con.description + '</span></div>'
							+ '<div class="lh24">更新时间:<span class="ml5">' + item.update_date + '</span></div>'
						+ '</div>'
						+ '<div class="absolute operation pointer hide">删除图片</div>'
					+ '</div>';
			}
			
			if(page.currentPage == 1) {
				$attachmentList.html(html);
			} else {
				$attachmentList.append(html);
			}
		}
	});
	
	var $clipImageContainer = $('.clip-image-container'),
	$clipModal = $('#clip-modal');
	
	// 重置上传
	$clipModal.ToggleModal($.noop, function() {
		$clipImageContainer.trigger('reset');
	});
	
	$('#add-img').bind('click', function() {
		$clipModal.trigger('show');
	});
	
	$('.cancel-btn').bind('click', function() {
		$clipModal.trigger('hide');
	});
	
	$clipImageContainer.ClipImage({
		saveCallback : function(data) {
			var $option = $categoryListSub.find('option:selected');
			typeId = $option.attr('data-id');
			
			$.ajax({
				url : base_url + 'attachment/saveOrUpdate',
				type : 'post',
				data : {
					path : data.imgPath,
					typeId : typeId
				},
				success : function(result) {
					ZUtil.success('图片上传成功');
					reload();
				}
			});
		}
	});
	
});