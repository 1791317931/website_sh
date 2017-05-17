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
		<button class="btn btn-primary ml20 btn-2" id="user-list-search">查询</button>
		<button class="btn btn-danger ml20" id="add-user">新增用户</button>
	</div>
	<div class="empty user-list mt20" id="user-list" data-empty="暂无用户"></div>
</div>
<div class="z-modal hide" id="user-modal">
	<div class="z-modal-body user-modal">
		<div class="form-group">
			<label class="label-3 text-right">用户名:</label>
			<div class="form-control r10">
				<input type="text" id="add-username" placeholder="请输入用户名" />
			</div>
			<span class="must">*</span>
		</div>
		<div class="form-group">
			<label class="label-3 text-right">手机号:</label>
			<div class="form-control r10">
				<input type="text" id="add-phone" value="" placeholder="请输入手机号" />
			</div>
			<span class="must">*</span>
		</div>
		<div class="form-group">
			<label class="label-3 text-right">密码:</label>
			<div class="form-control r10">
				<input type="password" id="add-password" value="" placeholder="请输入密码" />
			</div>
			<span class="must">*</span>
		</div>
		<div class="form-group">
			<label class="label-3 text-right">角色:</label>
			<div class="form-control r10">
				<select id="add-role"></select>
			</div>
		</div>
		<div class="form-group text-center mt30">
			<button class="btn btn-primary btn-2" id="add-user-sure">添加</button>
			<button class="btn btn-danger btn-2 ml20" id="add-user-cancel">取消</button>
		</div>
	</div>
</div>
<div class="z-modal hide" id="valid-modal">
	<div class="z-modal-body valid-modal">
		<div class="form-group">
			<label>是否有效:</label>
			<div class="form-control">
				<select id="valid-select">
					<option value="Y">是</option>
					<option value="N">否</option>
				</select>
			</div>
		</div>
		<div class="form-group mt30 text-center">
			<button class="btn btn-primary btn-2" id="change-valid-sure">确定</button>
			<button class="btn btn-danger btn-2 ml20" id="change-valid-cancel">取消</button>
		</div>
	</div>
</div>
<div class="z-modal hide" id="status-modal">
	<div class="z-modal-body status-modal">
		<div class="form-group">
			<label>审核流程:</label>
			<div class="form-control">
				<select id="status-select"></select>
			</div>
		</div>
		<div class="form-group mt30 text-center">
			<button class="btn btn-primary btn-2" id="change-status-sure">确定</button>
			<button class="btn btn-danger btn-2 ml20" id="change-status-cancel">取消</button>
		</div>
	</div>
</div>
<div class="z-modal hide" id="role-modal">
	<div class="z-modal-body role-modal">
		<div class="form-group">
			<label>用户角色:</label>
			<div class="form-control">
				<select id="role-select"></select>
			</div>
		</div>
		<div class="form-group mt30 text-center">
			<button class="btn btn-primary btn-2" id="change-role-sure">确定</button>
			<button class="btn btn-danger btn-2 ml20" id="change-role-cancel">取消</button>
		</div>
	</div>
</div>
<div class="z-modal hide" id="password-modal">
	<div class="z-modal-body password-modal">
		<div class="form-group">
			<label class="label-3">新密码:</label>
			<div class="form-control r10">
				<input type="password" id="update-password" />
			</div>
			<span class="must">*</span>
		</div>
		<div class="form-group mt30 text-center">
			<button class="btn btn-primary btn-2" id="update-password-sure">确定</button>
			<button class="btn btn-danger btn-2 ml20" id="update-password-cancel">取消</button>
		</div>
	</div>
</div>