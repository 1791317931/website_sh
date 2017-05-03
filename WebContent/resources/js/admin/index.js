$(function() {
	// 注册
	(function() {
		var $registModal = $('#regist-modal'),
		$registSure = $('#regist-sure'),
		$registCancel = $('#regist-cancel'),
		$toLogin = $('#to-login');
		
		$registModal.ToggleModal($.noop, function() {
			$('#username').val('');
			$('#phone').val('');
			$('#password').val('');
		});
		
		$('#username,#phone,#password').bind('keydown', function(e) {
			if (e.keyCode == 13) {
				regist();
			}
		});
		
		function regist() {
			var username = $.trim($('#username').val()),
			phone = $.trim($('#phone').val()),
			password = $.trim($('#password').val());
			
			if (!username) {
				ZUtil.error('用户名不能为空');
				return false;
			} else if (username.length > 30) {
				ZUtil.error('用户名最多30个字符');
				return false;
			}
			var reg = /^1(3|5|7|8)\d{9}$/;
			if (!reg.test(phone)) {
				ZUtil.error('手机号不合法');
				return false;
			}
			if (!password) {
				ZUtil.error('密码不能为空');
				return false;
			} else if (password.length < 6) {
				ZUtil.error('密码最少6位');
				return false;
			} else if (password.length > 12) {
				ZUtil.error('密码最多12位');
				return false;
			}
			
			$.ajax({
				url : base_url + 'user/regist',
				type : 'post',
				data : {
					username : username,
					phone : phone,
					password : password
				},
				success : function(result) {
					var data = result.data || {};
					if (data.code == 1) {
						ZUtil.success('注册成功');
						setTimeout(function() {
							location.href = location.href;
						}, 2000);
					} else {
						ZUtil.error(data.msg || '服务器异常');
					}
				}
			});
		}
		
		$registSure.bind('click', function() {
			regist();
		});
		
		$registCancel.bind('click', function() {
			location.href = base_url + 'main/index';
		});
		
		$toLogin.bind('click', function() {
			$registModal.trigger('hide');
			$loginContainer.trigger('show');
		});

		// 登录
		var $loginContainer = $('#login-container'),
		$loginSure = $('#login-sure'),
		$loginCancel = $('#login-cancel'),
		$toRegist = $('#to-regist');
		
		$loginContainer.ToggleModal($.noop, function() {
			$('#login-phone').val('');
			$('#login-password').val('');
		});
		
		function login(phone, password) {
			$.ajax({
				url : base_url + 'user/login',
				type : 'post',
				data : {
					phone : phone,
					password : password
				},
				success : function(result) {
					if (result.data) {
						ZUtil.success('登录成功');
						setTimeout(function() {
							location.href = location.href;
						}, 2000);
					} else {
						ZUtil.error('手机号或密码不正确');
					}
				}
			});
		}
		
		$loginSure.bind('click', function() {
			var phone = $.trim($('#login-phone').val()),
			password = $.trim($('#login-password').val());
			if (!phone) {
				ZUtil.error('手机号不能为空');
				return false;
			}
			if (!password) {
				ZUtil.error('密码不能为空');
				return false;
			}
			login(phone, password);
		});
		
		$('#login-phone,#login-password').bind('keydown', function(e) {
			if (e.keyCode == 13) {
				$loginSure.click();
			}
		});
		
		$loginCancel.bind('click', function() {
			location.href = base_url + 'main/index';
		});
		
		$toRegist.bind('click', function() {
			$loginContainer.trigger('hide');
			$registModal.trigger('show');
		});
	})();
	
	// 自动弹出登录框
	if (['1', '2'].indexOf(role) == -1) {
		ZUtil.error('您没有权限进入该页面');
		$('#login-container').trigger('show');
		$('.main-body,.nav-head').remove();
		return false;
	}
	
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