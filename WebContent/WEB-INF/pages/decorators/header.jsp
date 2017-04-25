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
	<script type="text/javascript">
		var base_url = '<%=basePath%>',
		username = '${user.username}',
		id = '${user.id}',
		role = '${user.con.code}';
	</script>
	<link rel="stylesheet" href="<%=basePath%>resources/css/common/index.css?<%=new Date().getTime()%>">
	<link rel="stylesheet" href="<%=basePath%>resources/css/common/message-tip.css?<%=new Date().getTime()%>">
	<script src="<%=basePath %>resources/js/common/jquery.js?<%=new Date().getTime()%>"></script>
	<script src="<%=basePath %>resources/js/common/index.js?<%=new Date().getTime()%>"></script>
	<link rel="stylesheet" href="<%=basePath%>resources/css/decorators/decorator.css?<%=new Date().getTime()%>">

</head>
<body>
	<div class="header">
		<div class="w1200 clearfix">
			<div class="pull-right option-container mt6 hide">
				<span><a href="<%=basePath%>main/index">首页</a></span>
				<span><a class="to-manage" href="<%=basePath%>admin/index">管理</a></span>
				<span><a class="to-shopCar" href="<%=basePath%>product/user/shopcar">进入购物车</a></span>
				<span><a class="to-login" href="javascript:">登录</a></span>
				<span><a class="to-regist" href="javascript:">注册</a></span>
				<span><span class="welcome-container">${user.username}</span>，您好</span>
				<span><a class="to-logout" href="<%=basePath%>user/logout">退出</a></span>
			</div>
		</div>
	</div>
	<div class="head-nav">
		<a href="<%=basePath%>main/index">
			<img class="logo" />
		</a>
	</div>
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
					<button class="btn btn-primary btn-half ml10" id="regist-cancel">关闭</button>
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
					<button class="btn btn-primary btn-half ml10" id="login-cancel">关闭</button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>