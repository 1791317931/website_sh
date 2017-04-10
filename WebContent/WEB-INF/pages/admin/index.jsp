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
<title>后台管理端</title>
	<script type="text/javascript">
		var base_url = '<%=basePath%>';
	</script>
	<link rel="stylesheet" href="<%=basePath %>resources/css/common/index.css?<%=new Date().getTime()%>">
	<link rel="stylesheet" href="<%=basePath %>resources/css/common/message-tip.css?<%=new Date().getTime()%>">
	<link rel="stylesheet" href="<%=basePath %>resources/css/common/clip-image.css?<%=new Date().getTime()%>">
	<link rel="stylesheet" href="<%=basePath %>resources/css/admin/index.css?<%=new Date().getTime()%>">
	
	<script src="<%=basePath %>resources/js/common/jquery.js?<%=new Date().getTime()%>"></script>
	<script src="<%=basePath %>resources/js/common/jquery.validate.js?<%=new Date().getTime()%>"></script>
	<script src="<%=basePath %>resources/js/common/index.js?<%=new Date().getTime()%>"></script>
	<script src="<%=basePath %>resources/js/common/Scroll.js?<%=new Date().getTime()%>"></script>
	<script src="<%=basePath %>resources/js/common/pagination.js?<%=new Date().getTime()%>"></script>
	<script src="<%=basePath %>resources/js/admin/index.js?<%=new Date().getTime()%>"></script>
	
</head>
<body>
	<div class="nav-head"></div>
	<div class="common-body clearfix">
		<div class="menu-container">
			<ul class="menu">
				<li>
					<p>基础数据</p>
					<ul class="sub-menu">
						<li>
							<p data-url="const/role">角色管理</p>
						</li>
						<li>
							<p data-url="property/admin/index">属性管理</p>
						</li>
						<li>
							<p data-url="category/admin/index">属性分类管理</p>
						</li>
						<!-- <li>
							<p data-url="">供应商管理</p>
						</li> -->
					</ul>
				</li>
				<li>
					<p>资源数据</p>
					<ul class="sub-menu">
						<li>
							<p data-url="product/admin/index">商品管理</p>
						</li>
						<!-- <li>
							<p data-url="">材料管理</p>
						</li> -->
						<li>
							<p data-url="attachment/index">图片管理</p>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="content-container ">
			<!-- <iframe class="content-body" id="content-body"></iframe> -->
			<div class="content-body" id="content-body"></div>
		</div>
	</div>
</body>
</html>