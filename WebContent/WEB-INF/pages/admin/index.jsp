<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<%@ page import="com.cn.entity.User" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	Object obj = session.getAttribute("user");
	User user = null;
	if (obj != null) {
		user = (User)obj;
	}
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>后台管理系统</title>
	<script type="text/javascript">
		var base_url = '<%=basePath%>',
		username = '${user.username}',
		id = '${user.id}',
		role = '${user.con.code}';
	</script>
	<link rel="stylesheet" href="<%=basePath %>resources/css/common/index.css?<%=new Date().getTime()%>">
	<link rel="stylesheet" href="<%=basePath %>resources/css/common/clip-image.css?<%=new Date().getTime()%>">
	<link rel="stylesheet" href="<%=basePath %>resources/css/common/message-tip.css?<%=new Date().getTime()%>">
	<link rel="stylesheet" href="<%=basePath %>resources/css/common/record.css?<%=new Date().getTime()%>">
	<link rel="stylesheet" href="<%=basePath %>resources/css/common/upload-file.css?<%=new Date().getTime()%>">
	<link rel="stylesheet" href="<%=basePath %>resources/css/admin/index.css?<%=new Date().getTime()%>">
	
	<script src="<%=basePath %>resources/js/common/jquery.js?<%=new Date().getTime()%>"></script>
	<script src="<%=basePath %>resources/js/common/jquery.validate.js?<%=new Date().getTime()%>"></script>
	<script src="<%=basePath %>resources/js/common/index.js?<%=new Date().getTime()%>"></script>
	<script src="<%=basePath %>resources/js/common/Scroll.js?<%=new Date().getTime()%>"></script>
	<script src="<%=basePath %>resources/js/common/pagination.js?<%=new Date().getTime()%>"></script>
	<script src="<%=basePath %>resources/js/admin/index.js?<%=new Date().getTime()%>"></script>
	<script src="<%=basePath %>resources/js/common/common.js?<%=new Date().getTime()%>"></script>
	
</head>
<body>
	<div class="z-modal hide" id="regist-modal">
		<div class="z-modal-body regist-modal">
			<div class="clearfix">
				<div class="form-group">
					<label class="label-3 text-right">用户名:</label>
					<div class="form-control r10">
						<input type="text" id="username" />
					</div>
					<span class="must">*</span>
				</div>
				<div class="form-group">
					<label class="label-3 text-right">手机号:</label>
					<div class="form-control r10">
						<input type="text" id="phone" />
					</div>
					<span class="must">*</span>
				</div>
				<div class="form-group">
					<label class="label-3 text-right">密码:</label>
					<div class="form-control r10">
						<input type="password" id="password" />
					</div>
					<span class="must">*</span>
				</div>
				<div class="form-group text-center mt30">
					<button class="btn btn-primary btn-half" id="regist-sure">注册</button>
					<button class="btn btn-primary btn-half ml10" id="regist-cancel">取消</button>
				</div>
				<div class="text-right mt10">
					<span class="for-edit" id="to-login">已经有系统账号?去登录</span>
				</div>
			</div>
		</div>
	</div>
	<div class="z-modal hide" id="login-container">
		<div class="z-modal-body login-container">
			<div class="clearfix">
				<div class="form-group">
					<label class="label-3 text-right">手机号:</label>
					<div class="form-control">
						<input type="text" id="login-phone" />
					</div>
				</div>
				<div class="form-group">
					<label class="label-3 text-right">密码:</label>
					<div class="form-control">
						<input type="password" id="login-password" />
					</div>
				</div>
				<div class="form-group text-center mt30">
					<button class="btn btn-primary btn-half" id="login-sure">登录</button>
					<button class="btn btn-primary btn-half ml10" id="login-cancel">取消</button>
				</div>
			</div>
			<div class="text-right mt10">
				<span class="for-edit" id="to-regist">还没有系统账号?去注册</span>
			</div>
		</div>
	</div>
	<div class="nav-head">
		<div class="pull-right nav-container">
			<span><a href="<%=basePath%>main/index">首页</a></span>
			<span><span class="welcome-container">${user.username}</span>，您好</span>
			<span><a href="<%=basePath%>user/logout">退出</a></span>
		</div>
	</div>
	<div class="main-body">
		<div class="common-body clearfix table">
			<div class="menu-container table-cell vt container-box">
				<ul class="menu">
					<li>
						<p>基础数据</p>
						<ul class="sub-menu">
							<li>
								<p data-url="const/role">角色管理</p>
							</li>
							<li>
								<p data-url="user/admin/index">用户管理</p>
							</li>
							<li>
								<p data-url="property/admin/index">属性管理</p>
							</li>
							<li>
								<p data-url="category/admin/index">属性分类管理</p>
							</li>
							<li>
								<p data-url="const/product/category">商品分类管理</p>
							</li>
						</ul>
					</li>
					<li>
						<p>资源管理</p>
						<ul class="sub-menu">
							<li>
								<p data-url="attachment/index">图片管理</p>
							</li>
							<li>
								<p data-url="product/admin/index">商品列表</p>
							</li>
							<li>
								<p data-url="product/admin/toEdit">商品编辑</p>
							</li>
							<li>
								<p data-url="material/admin/index">材料管理</p>
							</li>
							<li>
								<p data-url="material/admin/toEdit">材料编辑</p>
							</li>
						</ul>
					</li>
					<li>
						<p>首页配置</p>
						<ul class="sub-menu">
							<li>
								<p data-url="attachment/logo/index">LOGO配置</p>
							</li>
							<li>
								<p data-url="attachment/banner/index">Banner配置</p>
							</li>
							<li>
								<p data-url="product/admin/productCategory">商品配置</p>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<div class="content-container table-cell vt container-box">
				<div class="content-body" id="content-body"></div>
			</div>
		</div>
	</div>
	<div class="content-loading hide">
		<div class="empty content-loading-body" data-empty=""></div>
	</div>
</body>
</html>