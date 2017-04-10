$(function() {
	
	var html = '';
	for(var i = 1, length = 3; i <= length; i++) {
		html += '<div class="slider-item">'
				+ '<img src="' + base_url + 'resources/imgs/' + i + '.jpg" />'
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
	
	$('.nav-container > div').bind('click', function() {
		var $this = $(this);
		if($this.hasClass('active')) {
			return false;
		}
		$this.addClass('active').siblings('div').removeClass('active');
		$('.content-item').removeClass('active');
		$('.content-item[data-id="' + $this.attr('data-id') + '"]').addClass('active');
	});
	
});