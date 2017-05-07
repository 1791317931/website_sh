// 注册
(function() {
	var $toRegist = $('.to-regist'),
	$registModal = $('#regist-modal'),
	$registSure = $('#regist-sure'),
	$registCancel = $('#regist-cancel'),
	$toLogin = $('#to-login');
	
	if ($toRegist.length) {
		$registModal.ToggleModal($.noop, function() {
			$('#username').val('');
			$('#phone').val('');
			$('#password').val('');
		});
		
		$toRegist.bind('click', function() {
			$registModal.trigger('show');
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
			$registModal.trigger('hide');
		});
		
		$toLogin.bind('click', function() {
			$registModal.trigger('hide');
			$('#login-container').trigger('show');
		});
	} else {
		$registModal.remove();
	}
})();

// 登录
(function() {
	var $toLogin = $('.to-login'),
	$loginContainer = $('#login-container'),
	$loginSure = $('#login-sure'),
	$loginCancel = $('#login-cancel'),
	$toRegist = $('#to-regist');
	
	if ($toLogin.length) {
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
		
		$toLogin.bind('click', function() {
			$loginContainer.trigger('show');
		});
		
		$loginCancel.bind('click', function() {
			$loginContainer.trigger('hide');
		});
		
		$toRegist.bind('click', function() {
			$loginContainer.trigger('hide');
			$('#regist-modal').trigger('show');
		});
	} else {
		$loginContainer.remove();
	}
})();

// 初始化顶部
(function() {
	var $optionContainer = $('.option-container');
	
	// 已登录
	if (id) {
		$('.to-login').parent('span').remove();
		$('.to-regist').parent('span').remove();
		if (['1', '2'].indexOf(role) == -1) {
			$('.to-manage').parent('span').remove();
		}
	} else {
		// 未登录
		$('.to-shopCar').parent('span').remove();
		$('.to-manage').parent('span').remove();
		$('.welcome-container').parent('span').remove();
		$('.to-logout').parent('span').remove();
	}
	$optionContainer.removeClass('hide');
})();

// 加载LOGO
(function() {
	$.ajax({
		url : base_url + 'attachment/page/vo',
		data : {
			type : 'file',
			code : 3
		},
		success : function(result) {
			var data = result.data,
			list = data.list || [],
			item = list[0];
			if (item) {
				$('.logo').attr('src', base_img + item.path);
			} else {
				$('.logo').attr('title', '暂无Logo');
			}
		}
	});
})();