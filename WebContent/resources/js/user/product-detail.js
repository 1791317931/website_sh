$(function() {
	
	var productId = $('#product-id').val();
	
	(function() {
		function renderProduct(product) {
			$('#product-name').html(product.name);
			$('#product-price').html((product.price || 0) + '（￥）');
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
		
		
		var html = '';
		for(var i = 1, length = 3; i <= length; i++) {
			html += '<div class="slider-item">'
				+ '<img src="' + base_img + 'resources/imgs/' + i + '.jpg" />'
				+ '</div>'
		}
		$('.product-scroll').HorizontalSlide({
			mode : 'normal',
			sliderBody : html,
			showArrow : true,
			showClose : false,
			itemCallback : function(e) {
				$('.product-detail').attr('src', $(e.target).attr('src'));
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