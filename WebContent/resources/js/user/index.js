$(function() {
	
	var $registModal = $('#regist-modal'),
	$loginContainer = $('#login-container'),
	isValid = true,
	$userImg = $('.user-img'),
	$userImgContainer = $('.user-img-container'),
	$headImgModal = $('#head-img-modal'),
	$lis = $('.menu li'),
	$items = $('.content-body .item'),
	$userForm = $('#userForm');
	
	function renderInfo(data) {
		$('#name').val(data.username || '');
		$('#realname').val(data.real_name || '');
		$('#tel').val(data.phone);
		$('#age').val(data.age || '');
		var sex = data.sex;
		if (sex) {
			$('.sex[value="' + sex + '"]').click();
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
		
		$lis.eq(0).click();
		
	})();
	
});