$(function() {
	
	var productId = $('#product-id').val(),
	$productDetail = $('.product-detail'),
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
				renderProduct(product);
			}
		});
		
	})();
	
	(function() {
		$('.nav-container > div').bind('click', function() {
			var $this = $(this);
			if($this.hasClass('active')) {
				return false;
			}
			$this.addClass('active').siblings('div').removeClass('active');
			$('.content-item').removeClass('active');
			$('.content-item[data-id="' + $this.attr('data-id') + '"]').addClass('active');
		});
	})();
	
});