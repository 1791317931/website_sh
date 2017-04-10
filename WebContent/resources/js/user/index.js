$(function() {
	
	$('.menu li').bind('click', function() {
		$this = $(this);
		if($this.hasClass('active')) {
			return false;
		}
		
		$this.siblings('li').removeClass('active').end().addClass('active');
	});
	
});