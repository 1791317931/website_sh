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
	$statusSelect = $('#status-select');
	
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
						html += '<option value="' + item.value + '">' + item.description + '</option>';
					}
					
					$container.append(html);
					
					if (type == 'user_status') {
						statusList = list;
						$statusSelect.html(html);
					}
				}
			});
		}
		
		initSelect($searchRole, 'user_type');
		
		initSelect($searchStatus, 'user_status');
		
	})();
	
	(function() {
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
				width : '20%'
			}, {
				id : 'phone',
				title : '手机号',
				width : '10%'
			}, {
				title : '角色',
				width : '10%',
				render : function(row, value) {
					return row.con.description;
				}
			}, {
				id : 'is_valid',
				title : '状态',
				width : '10%',
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
				width : '20%'
			}, {
				title : '操作',
				width : '20%',
				render : function(row, value) {
					var valid = row.is_valid,
					status = row.status,
					html = '<div data-id="' + row.id + '">';
					
					// 如果已经审核通过，就只能修改是否有效
					if (['P'].indexOf(status) != -1) {
						html += '<span class="for-edit change-valid" data-valid="' + row.is_valid + '">修改状态</span>';
						// 修改角色
/*						html += '<span class="for-edit change-valid" data-valid="' + row.is_valid + '">修改状态</span>'
						+ '<span class="for-edit change-role ml10" data-role="' + row.con + '">修改</span>';
*/					} else {
						html += '<span class="for-edit change-status" data-status="' + row.status + '">审核</span>';
					}
							
					html += '</div>';
					return html;
				}
			}]
		});
		
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
		
		$validModal.ToggleModal();
		
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
		
		$('#change-status-cancel').bind('click', function() {
			$statusModal.trigger('hide');
		});
		
	})();
});