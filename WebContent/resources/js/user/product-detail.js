$(function() {
	
	var productId = $('#product-id').val(),
	$productDetail = $('.product-detail'),
	$similarProduct = $('.similar-product'),
	categoryId,
	$comment = $('#comment'),
	$addComment = $('#add-comment'),
	$clearComment = $('#clear-comment'),
	$commentList = $('.comment-list'),
	// .horizontal-slider只能显示5个图片
	LENGTH = 5;
	
	function loadComments() {
		$commentList.empty();
		
		$commentList.Scroll({
			url : base_url + 'comment/page/byProductId',
			data : {
				productId : productId
			},
			success : function(result) {
				var html = '',
				list = result.data.list || [];
				for (var i = 0, length = list.length; i < length; i++) {
					var comment = list[i],
					headUrl = comment.headUrl,
					username = comment.username;
					
					headUrl = headUrl && (base_img + headUrl) || (base_url + 'resources/imgs/1.jpg');
					
					html = '<div class="table comment-item">'
							+ '<div class="table-cell table-cell-l vt">'
								+ '<p class="tf cr" title="' + username + '">' + username + '</p>'
								+ '<div class="text-center mt5">'
									+ '<img class="user-img" src="' + headUrl + '" />'
								+ '</div>'
							+ '</div>'
							+ '<div class="table-cell vt text-left p5">'
								+ '<p class="text-break mh100">' + (comment.note || '').replace('<', '&lt;').replace('>', '&gt;') + '</p>'
								+ '<div class="text-right">'
									+ '<span>评论时间:</span><span class="ml5">' + comment.create_date + '</span>'
								+ '</div>'
							+ '</div>'
						+ '</div>';
				}
				
				$commentList.append(html);
			}
		});
	}
	
	(function() {
		function renderImages(imgUrls) {
			var html = '';
			for(var i = 1, length = imgUrls.length; i <= length; i++) {
				var img = imgUrls[i - 1];
				html += '<div class="slider-item">'
						+ '<img src="' + base_img + img + '" />'
					+ '</div>';
			}
			
			$('.product-scroll').HorizontalSlide({
				mode : 'normal',
				slideDistance : 75,
				sliderBody : html,
				showArrow : true,
				showClose : false,
				showFooter : false,
				clickCallback : function(index, length) {
					if (length - index == LENGTH) {
						$('.triangle-right').addClass('disabled');
					}
				},
				itemCallback : function(e) {
					$productDetail.attr('src', $(e.target).attr('src'));
				},
				renderCallback : function(index, length) {
					$productDetail.attr('src', base_img + imgUrls[0]);
					if (length < 6) {
						$('.triangle-right').addClass('disabled');
					}
					var width = $('.slider-item').width();
					$('.slider-content').css('width', length * (width + 5));
				}
			});
		}
		
		function renderProduct(product) {
			$('#product-name').html(product.name);
			$('#product-price').html((product.price || 0) + '（￥）');
			$('#product-count').html(product.count);
			var propertyObjs = product.propertyObjs || [],
			html = '';
			for (var i = 0, length = propertyObjs.length; i < length; i++) {
				var property = propertyObjs[i];
				html += '<div class="form-group col-6">'
							+ '<label class="label-4">' + property.name + ':</label>'
							+ '<div class="form-control">'
								+ '<span>' + property.value + '</span>'
							+ '</div>'
						+ '</div>';
			}
			$('#property-container').append(html);
			renderImages(product.imgUrls);
		}
		
		$.ajax({
			url : base_url + 'product/detail',
			data : {
				id : productId
			},
			success : function(result) {
				var product = result.data;
				categoryId = result.categoryId;
				renderProduct(product);
			}
		});
		
	})();
	
	(function() {
		$('#add-shopcar').bind('click', function() {
			if (!id) {
				$('.to-login').click();
				return false;
			}
			
			$.ajax({
				url : base_url + 'shopcar/add',
				data : {
					product_id : productId,
					count : 1
				},
				type : 'post',
				success : function(result) {
					ZUtil.success('添加成功');
				}
			});
			
		});
		
		function loadSimilarProduct() {
			loadList({
				data : {
					categoryId : categoryId
				},
				container : $similarProduct
			});
		}
		
		$('.nav-container > div').bind('click', function() {
			var $this = $(this),
			dataId = $this.attr('data-id');
			
			if($this.hasClass('active')) {
				return false;
			}
			$this.addClass('active').siblings('div').removeClass('active');
			$('.content-item').removeClass('active');
			$('.content-item[data-id="' + dataId + '"]').addClass('active');
			
			if (dataId == 'product') {
				loadSimilarProduct();
			} else if (dataId == 'comment') {
				loadComments();
			}
		});
		
		$comment.Record({
			length : 1000
		});
		
		function addComment(data) {
			$.ajax({
				url : base_url + 'comment/save',
				data : data,
				type : 'post',
				success : function(result) {
					ZUtil.success('评论保存成功');
					loadComments();
				}
			});
		}
		
		$addComment.bind('click', function() {
			if (!id) {
				ZUtil.error('请登录后再评论');
				return false;
			}
			
			var comment = $.trim($comment.val());
			if (!comment) {
				ZUtil.error('内容不能为空');
				return false;
			} else if (comment.length > 1000) {
				ZUtil.error('内容最多1000个字符');
				return false;
			}
			var data = {
				note : comment,
				product_id : productId
			};
			
			addComment(data);
		});
		
		$clearComment.bind('click', function() {
			$comment.val('');
		});
		
		$('.nav-container div[data-id="comment"]').click();
		
	})();
	
});