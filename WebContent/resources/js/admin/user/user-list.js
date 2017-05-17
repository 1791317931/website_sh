$(function() {
	var $searchUsername = $('#search-username'),
	$searchPhone = $('#search-phone'),
	$searchValid = $('#search-valid'),
	$searchStatus = $('#search-status'),
	$searchRole = $('#search-role'),
	$userListSearch = $('#user-list-search'),
	$userList = $('#user-list'),
	statusList = [],
	statusObj = {
		N : '无效',
		Y : '有效'
	},
	$validModal = $('#valid-modal'),
	$statusModal = $('#status-modal'),
	$validSelect = $('#valid-select'),
	$statusSelect = $('#status-select'),
	$userModal = $('#user-modal'),
	$addUsername = $('#add-username'),
	$addPhone = $('#add-phone'),
	$addPassword = $('#add-password'),
	$addRole = $('#add-role'),
	$roleModal = $('#role-modal'),
	$roleSelect = $('#role-select'),
	$passwordModal = $('#password-modal'),
	$updatePassword = $('#update-password');
	
	(function() {
		function initSelect($container, type) {
			$.ajax({
				url : base_url + 'const/list',
				async : false,
				data : {
					type : type
				},
				success : function(result) {
					var list = result.data || [],
					html = '';
					
					for (var i = 0, length = list.length; i < length; i++) {
						var item = list[i];
						html += '<option value="' + item.id + '">' + item.description + '</option>';
					}
					
					$container.append(html);
					
					if (type == 'user_status') {
						statusList = list;
						$statusSelect.html(html);
					} else {
						$addRole.html(html);
						$roleSelect.html(html);
					}
				}
			});
		}
		
		initSelect($searchRole, 'user_type');
		
		initSelect($searchStatus, 'user_status');
		
		function getStatusDesc(status) {
			for (var i = 0, length = statusList.length; i < length; i++) {
				var item = statusList[i];
				if (item.value == status) {
					return item.description;
				}
			}
		}

		$userList.pagination({
			url : base_url + 'user/page',
			type : 'post',
			columns : [{
				id : 'username',
				title : '用户名',
				width : '15%'
			}, {
				id : 'phone',
				title : '手机号',
				width : '12%'
			}, {
				title : '角色',
				width : '10%',
				render : function(row, value) {
					return row.con.description;
				}
			}, {
				id : 'is_valid',
				title : '状态',
				width : '8%',
				render : function(row, value) {
					return statusObj[value];
				}
			}, {
				id : 'status',
				title : '审核流程',
				width : '10%',
				render : function(row, value) {
					return getStatusDesc(value);
				}
			}, {
				id : 'update_date',
				title : '最后修改时间',
				width : '17%'
			}, {
				title : '操作',
				width : '28%',
				render : function(row, value) {
					var valid = row.is_valid,
					status = row.status,
					html = '<div data-id="' + row.id + '">';
					
					// 如果已经审核通过，就只能修改是否有效
					if (['P'].indexOf(status) != -1) {
						html += '<span class="for-edit change-valid" data-valid="' + row.is_valid + '">修改状态</span>'
							+ '<span class="for-edit change-role ml20" data-role="' + row.con.id + '">修改角色</span>'
							+ '<span class="for-edit change-password ml20">修改密码</span>';
					} else {
						html += '<span class="for-edit change-status" data-status="' + row.status + '">审核</span>';
					}
							
					html += '</div>';
					return html;
				}
			}]
		});
		
	})();
	
	(function() {
		function regist() {
			var username = $addUsername.val(),
			phone = $addPhone.val(),
			password = $addPassword.val(),
			roleId = $addRole.val();
			
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
					password : password,
					roleId : $addRole.val(),
					// 用户添加成功后，不登录
					login : false
				},
				success : function(result) {
					var data = result.data || {};
					if (data.code == 1) {
						ZUtil.success('添加成功');
						$userModal.trigger('hide');
						$userList.trigger('reload');
					} else {
						ZUtil.error(data.msg || '服务器异常');
					}
				}
			});
		}
		
		$userModal.ToggleModal($.noop, function() {
			$addUsername.val('');
			$addPhone.val('');
			$addPassword.val('');
		});
		
		$('#add-user').bind('click', function() {
			$userModal.trigger('show');
		});
		
		$('#add-user-sure').bind('click', function() {
			regist();
		});
		
		$('#add-user-cancel').bind('click', function() {
			$userModal.trigger('hide');
		})
		
		$userListSearch.bind('click', function() {
			var username = $.trim($searchUsername.val()),
			phone = $.trim($searchPhone.val()),
			valid = $searchValid.val(),
			status = $searchStatus.val(),
			typeId = $searchRole.val(),
			data = {
				username : username,
				phone : phone,
				valid : valid,
				status : status,
				typeId : typeId
			};
			
			$userList.trigger('reload', data);
		});
		
		$userList.on('click', '.change-valid', function() {
			var $this = $(this),
			id = $this.closest('div').attr('data-id'),
			valid = $this.attr('data-valid');
			$validModal.attr('data-id', id);
			$validSelect.val(valid);
			$validModal.trigger('show');
		});
		
		$userList.on('click', '.change-status', function() {
			var $this = $(this),
			id = $this.closest('div').attr('data-id'),
			status = $this.attr('data-status');
			
			$statusModal.attr('data-id', id);
			$statusSelect.val(status);
			$statusModal.trigger('show');
		});
		
		$userList.on('click', '.change-role', function() {
			var $this = $(this),
			roleId = $this.attr('data-role'),
			id = $this.closest('div').attr('data-id');
			
			$roleSelect.val(roleId);
			$roleModal.attr('data-id', id);
			$roleModal.trigger('show');
		});
		
		$userList.on('click', '.change-password', function() {
			var $this = $(this),
			id = $this.closest('div').attr('data-id');
			
			$passwordModal.attr('data-id', id);
			$passwordModal.trigger('show');
		});
		
		$validModal.ToggleModal();
		
		$roleModal.ToggleModal();
		
		$statusModal.ToggleModal();
		
		$('#change-valid-sure').bind('click', function() {
			var id = $validModal.attr('data-id'),
			valid = $validSelect.val();
			
			$.ajax({
				url : base_url + 'user/admin/update/status',
				type : 'post',
				data : {
					id : id,
					valid : valid
				},
				success : function(result) {
					var data = result.data || {};
					if (data.success) {
						ZUtil.success('数据修改成功');
						$validModal.trigger('hide');
						$userList.trigger('reload');
					} else {
						ZUtil.error(data.msg || '服务器异常');
					}
				}
			});
		});
		
		$('#change-role-sure').bind('click', function() {
			var roleId = $roleSelect.val(),
			id = $roleModal.attr('data-id');
			
			$.ajax({
				url : base_url + 'user/updateRole',
				data : {
					id : id,
					roleId : roleId
				},
				type : 'post',
				success : function(result) {
					if (!result.data.success) {
						ZUtil.error(result.data.msg);
					} else {
						ZUtil.success('数据修改成功');
						$roleModal.trigger('hide');
						$userList.trigger('reload');
					}
				}
			});
		});
		
		$('#change-status-sure').bind('click', function() {
			var id = $statusModal.attr('data-id'),
			status = $statusSelect.val();
			
			$.ajax({
				url : base_url + 'user/admin/update/status',
				type : 'post',
				data : {
					id : id,
					status : status
				},
				success : function(result) {
					var data = result.data || {};
					if (data.success) {
						ZUtil.success('数据修改成功');
						$statusModal.trigger('hide');
						$userList.trigger('reload');
					} else {
						ZUtil.error(data.msg || '服务器异常');
					}
				}
			});
		});
		
		$('#change-valid-cancel').bind('click', function() {
			$validModal.trigger('hide');
		});
		
		$('#change-role-cancel').bind('click', function() {
			$roleModal.trigger('hide');
		});
		
		$('#change-status-cancel').bind('click', function() {
			$statusModal.trigger('hide');
		});
		
		$passwordModal.ToggleModal($.noop, function() {
			$updatePassword.val('');
		});
		
		$('#update-password-sure').bind('click', function() {
			var id = $passwordModal.attr('data-id'),
			password = $updatePassword.val();
			
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
				url : base_url + 'user/updatePassword',
				type : 'post',
				data : {
					id : id,
					password : password
				},
				success : function(result) {
					ZUtil.success('密码修改成功');
					$passwordModal.trigger('hide');
				}
			});
		});
		
		$('#update-password-cancel').bind('click', function() {
			$passwordModal.trigger('hide');
		});
		
	})();
});