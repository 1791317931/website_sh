$(function() {
	
	var productId = $('#product-id').val(),
	$productDetail = $('.product-detail'),
	$similarProduct = $('.similar-product'),
	categoryId,
	// .horizontal-slider只能显示5个图片
	LENGTH = 5;
	
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
			$similarProduct.empty();
			$similarProduct.Scroll({
				url : base_url + 'product/page/byParam',
				data : {
					categoryId : categoryId
				},
				type : 'post',
				success : function(result) {
					var list = result.data.list || [],
					html = '';
					for (var i = 0, length = list.length; i < length; i++) {
						var product = list[i],
						id = product.id,
						name = product.name,
						count = product.count,
						price = product.price,
						urls = product.imgUrls || [];
						html += '<div class="product-item">'
								+ '<a href="' + base_url + 'product/user/detail?id=' + id + '" target="_blank">'
									+ '<img src="' + base_img + urls[0] + '" />'
								+ '</a>'
								+ '<div class="p5 product-desc">'
									+ '<p class="tf product-name">' + name + '</p>'
									+ '<div class="clearfix product-extral">'
										+ '<span class="pull-left tf col-6">库存:' + count + '</span>'
										+ '<span class="pull-right text-right tf col-6 product-price">' + price + '(￥)</span>'
									+ '</div>'
								+ '</div>'
							+ '</div>';
					}
					$similarProduct.append(html);
				}
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
				
			}
		});
	})();
	
});