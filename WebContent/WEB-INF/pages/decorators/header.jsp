<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<script type="text/javascript">
		var base_url = '<%=basePath%>';
	</script>
	<link rel="stylesheet" href="<%=basePath%>resources/css/common/index.css?<%=new Date().getTime()%>">
	<script src="<%=basePath %>resources/js/common/jquery.js?<%=new Date().getTime()%>"></script>
	<script src="<%=basePath %>resources/js/common/index.js?<%=new Date().getTime()%>"></script>
	<link rel="stylesheet" href="<%=basePath%>resources/css/decorators/decorator.css?<%=new Date().getTime()%>">

</head>
<body>
	<div class="header">
		<div class="w1200 clearfix">
			<div class="pull-right mt6">
				<a href="<%=basePath%>main/index">首页</a>|
				<a href="<%=basePath%>product/user/shopcar">进入购物车</a>|
				<a>管理</a>|
				<span>，您好</span>|
				<span>退出</span>
			</div>
		</div>
	</div>
	<div class="head-nav">
		<img class="logo" src="<%=basePath %>resources/imgs/logo.jpg" />
	</div>
</body>
</html>