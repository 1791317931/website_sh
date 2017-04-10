$(function() {
	
	$('#roleList').pagination({
		url : base_url + 'const/page',
		data : {
			type : 'user_type'
		},
		columns : [{
			id : 'value',
			title : '角色名称',
			width : '15%'
		}, {
			id : 'code',
			title : '角色编码',
			width : '15%'
		}, {
			id : 'description',
			title : '描述',
			width : '70%'
		}]
	});
	
});