$(function() {
	
	var html = '';
	for(var i = 1, length = 3; i <= length; i++) {
		html += '<div class="slider-item">'
				+ '<img src="' + base_url + 'resources/imgs/' + i + '.jpg" />'
			+ '</div>'
	}
	$('.banner').HorizontalSlide({
		mode : 'normal',
		sliderBody : html,
		showArrow : false,
		showClose : false
	});
	
});