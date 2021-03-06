$(function() {
	
	var $contentLoading = $('.content-loading');
	
	// 一级菜单
	$('.menu > li > p').bind('click', function() {
		var $p = $(this),
		$otherLis = $p.parent().siblings();
		
		// 删除其它一级菜单active
		$otherLis.find('.sub-menu').removeClass('active');
		
		// 切换
		var $subMenu = $p.next('.sub-menu');
		if($subMenu.hasClass('active')) {
			$subMenu.removeClass('active');
		} else {
			$subMenu.addClass('active');
		}
	});
	
	$('.sub-menu p').bind('click', function() {
		var $p = $(this);
		
		// 删除其它二级菜单active
		$p.parent().siblings().find('p').removeClass('active');
		$p.closest('.sub-menu').parent().siblings().find('.sub-menu p').removeClass('active');
		
		// 切换
		$p.addClass('active');
		$.ajax({
			url : base_url + $p.attr('data-url'),
			beforeSend : function() {
				$contentLoading.removeClass('hide');
			},
			complete : function() {
				$contentLoading.addClass('hide');
			},
			success : function(data) {
				$('#content-body').html(data);
			}
		});
		
	});
	
});