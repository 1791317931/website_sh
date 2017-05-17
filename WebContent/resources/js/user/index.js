$(function() {
	
	var $registModal = $('#regist-modal'),
	$loginContainer = $('#login-container'),
	isValid = true,
	$userImg = $('.user-img'),
	$userImgContainer = $('.user-img-container'),
	$headImgModal = $('#head-img-modal'),
	$lis = $('.menu li'),
	$items = $('.content-body .item'),
	$userForm = $('#userForm'),
	$updatePasswordContainer = $('.update-password-container'),
	$passwordProgress = $('.password-progress'),
	$oldPassword = $('#old-password'),
	$newPassword = $('#new-password'),
	$newSamePassword = $('#new-same-password'),
	$oldPasswordContainer = $('.old-password-container'),
	$newPasswordContainer = $('.new-password-container');
	
	function renderInfo(data) {
		$('#name').val(data.username || '');
		$('#realname').val(data.real_name || '');
		$('#tel').val(data.phone);
		$('#age').val(data.age || '');
		var sex = data.sex,
		imgUrl = data.imgUrl;
		if (sex) {
			$('.sex[value="' + sex + '"]').click();
		}
		if (imgUrl) {
			$('.user-img').attr('src', base_img + imgUrl);
		} else {
			$('.user-img').attr('src', ImageObj.user);
		}
	}
	
	function getUser() {
		$.ajax({
			url : base_url + 'user/detail',
			data : {
				id : id
			},
			success : function(result) {
				renderInfo(result.data);
			}
		});
	}
	
	(function() {
		// 检测是否登录
		if (!id) {
			$loginContainer.trigger('show');
			isValid = false;
			return false;
		}
	})();
	
	if (!isValid) {
		$('.standard').remove();
		return false;
	}
	
	(function() {
		$lis.bind('click', function() {
			$this = $(this),
			type = $this.attr('data-type');
			
			if($this.hasClass('active')) {
				return false;
			}
			
			$this.siblings('li').removeClass('active').end().addClass('active');
			$items.removeClass('active');
			$('.item[data-type="' + type + '"]').addClass('active');
			
			if (type == 'user-info') {
				getUser();
			} else if (type == 'password-edit') {
				$updatePasswordContainer.trigger('init');
			}
		});
		
		$headImgModal.ToggleModal();
		
		// 设置头像
		$headImgModal.ClipImage({
			fullscreenContainer : $headImgModal,
			saveCallback : function(data) {
				var url = data.imgPath;
				if (url) {
					$.ajax({
						url : base_url + 'attachment/user/saveOrUpdate',
						data : {
							url : url
						},
						type : 'post',
						success : function(result) {
							$userImg.attr('src', base_img + url);
							$headImgModal.trigger('hide');
							$headImgModal.trigger('reset');
							ZUtil.success('头像设置成功');
						}
					});
				}
			}
		});
		
		$userImgContainer.bind('click', function() {
			$headImgModal.trigger('show');
		});
		
		function checkPhone(phone) {
			var reg = /^1(3|5|7|8)\d{9}$/;
			return reg.test(phone);
		}
		
		function checkAge(age) {
			if (!age) {
				return true;
			}
			var reg = /^[1-9]\d*/;
			return reg.test(age);
		}
		
		function updateInfo(data) {
			$.ajax({
				url : base_url + 'user/updateInfo',
				data : data,
				type : 'post',
				success : function(result) {
					if (!result.data.success) {
						ZUtil.error(result.data.msg);
					} else {
						ZUtil.success('数据修改成功');
					}
				}
			});
		}
		
		$('#update-info-sure').bind('click', function() {
			var username = $.trim($('#name').val()),
			realname = $.trim($('#realname').val()),
			phone = $.trim($('#tel').val()),
			age = $.trim($('#age').val()),
			sex = $('.sex:checked').val(),
			data = {
				id : id
			};
			
			if (username.length > 30) {
				ZUtil.error('用户名最多30个字符');
				return false;
			}
			if (realname.length > 20) {
				ZUtil.error('真实姓名最多30个字符');
				return false;
			}
			if (!checkPhone(phone)) {
				ZUtil.error('请填写正确格式的手机号');
				return false;
			}
			if (!checkAge(age)) {
				ZUtil.error('请输入有效年龄');
				return false;
			}
			if (sex) {
				data.sex = sex;
			}
			data.username = username;
			data.real_name = realname;
			data.phone = phone;
			data.age = age;
			
			updateInfo(data);
		});
		
		$('#update-info-clear').bind('click', function() {
			$userForm.get(0).reset();
		});
		
		$updatePasswordContainer.bind('init', function() {
			$oldPasswordContainer.removeClass('hide');
			$newPasswordContainer.addClass('hide');
			$passwordProgress.trigger('toStep', 1);
			$oldPassword.val('');
			$newPassword.val('');
			$newSamePassword.val('');
		});
		
		$passwordProgress.ProgressBar({
			data : [1, 2, 3]
		});
		
		$('#old-password-sure').bind('click', function() {
			var password = $.trim($oldPassword.val()),
			length = password.length;
			if (length < 6) {
				ZUtil.error('密码最少6个字符');
				return false;
			} else if (length > 12) {
				ZUtil.error('密码最多12个字符');
				return false;
			}
			
			$.ajax({
				url : base_url + 'user/valid/password',
				data : {
					id : id,
					password : password
				},
				success : function(result) {
					if (result.data) {
						$passwordProgress.trigger('toStep', 2);
						$oldPasswordContainer.addClass('hide');
						$newPasswordContainer.removeClass('hide');
					} else {
						ZUtil.error('原密码不正确，请重新输入');
					}
				}
			});
			
		});
		
		$('#old-password-clear').bind('click', function() {
			$oldPassword.val('');
		});
		
		$('#new-password-sure').bind('click', function() {
			var password = $.trim($newPassword.val()),
			samePassword = $.trim($newSamePassword.val());
			if (password.length < 6) {
				ZUtil.error('密码最少6个字符');
				return false;
			} else if (password.length > 12) {
				ZUtil.error('密码最多12个字符');
				return false;
			} else if (password != samePassword) {
				ZUtil.error('两次密码不一致');
				return false;
			}
			$.ajax({
				url : base_url + 'user/updatePassword',
				type : 'post',
				data : {
					id : id,
					password : password
				},
				success : function(result) {
					ZUtil.success('密码修改成功');
					$passwordProgress.trigger('toStep', 3);
				}
			});
			
		});
		
		$('#new-password-clear').bind('click', function() {
			$newPassword.val('');
			$newSamePassword.val('');
		});
		
		$lis.eq(0).click();
		
	})();
	
});