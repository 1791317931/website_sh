<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>用户中心</title>
	<script type="text/javascript">
		var base_url = '<%=basePath%>';
	</script>
	<link rel="stylesheet" href="<%=basePath%>resources/css/user/index.css?<%=new Date().getTime()%>">
</head>
<body>
	<jsp:include page="../decorators/header.jsp" />
	<div class="standard clearfix mb20">
		<div class="menu-container">
			<div class="relative user-img-container pointer">
				<img class="user-img" src="<%=basePath %>resources/imgs/logo.jpg" />
				<p class="edit-img">编辑</p>
			</div>
			<ul class="menu">
				<li data-type="user-info">
					<p>资料编辑</p>
				</li>
				<li data-type="password-edit">
					<p>密码修改</p>
				</li>
				<!-- <li data-type="owned-product-list">
					<p>已购买商品</p>
				</li>
				<li data-type="receive-list">
					<p>收货地址编辑</p>
				</li> -->
			</ul>
		</div>
		<div class="content-body">
			
		</div>
	</div>
	<jsp:include page="../decorators/footer.jsp" />
</body>
	<script src="<%=basePath %>resources/js/user/index.js?<%=new Date().getTime()%>"></script>
</html>