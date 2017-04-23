<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<script type="text/javascript">
	var base_url = '<%=basePath%>';
</script>

<link rel="stylesheet" href="<%=basePath %>resources/css/admin/user-list.css?<%=new Date().getTime()%>">
<script src="<%=basePath%>resources/js/admin/user/user-list.js?<%=new Date().getTime()%>"></script>
<div class="p10">
	<div class="clearfix">
		<div class="form-group col-3">
			<label class="label-4">用户名:</label>
			<div class="form-control">
				<input type="text" id="search-username" placeholder="请输入用户名" />
			</div>
		</div>
		<div class="form-group col-3">
			<label class="label-4">手机号:</label>
			<div class="form-control">
				<input type="text" id="search-phone" placeholder="请输入手机号" />
			</div>
		</div>
		<div class="form-group col-3">
			<label class="label-4">是否有效:</label>
			<div class="form-control">
				<select id="search-valid">
					<option value="">--请选择--</option>
					<option value="Y">是</option>
					<option value="N">否</option>
				</select>
			</div>
		</div>
		<div class="form-group col-3">
			<label class="label-4">状态:</label>
			<div class="form-control">
				<select id="search-status">
					<option value="">--请选择--</option>
				</select>
			</div>
		</div>
		<div class="form-group col-3">
			<label class="label-4">角色:</label>
			<div class="form-control">
				<select id="search-role">
					<option value="">--请选择--</option>
				</select>
			</div>
		</div>
		<button class="btn btn-primary ml20 btn-2">查询</button>
	</div>
</div>