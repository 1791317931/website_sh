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
	<div class="main-body">
		<div class="common-body clearfix table">
			<div class="menu-container table-cell vt">
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
							<!-- <li>
								<p data-url="const/product">商品分类管理</p>
							</li> -->
						</ul>
					</li>
					<li>
						<p>资源数据</p>
						<ul class="sub-menu">
							<li>
								<p data-url="product/admin/index">商品列表</p>
							</li>
							<li>
								<p data-url="product/admin/toEdit">商品编辑</p>
							</li>
							<!-- <li>
								<p data-url="">材料管理</p>
							</li> -->
							<li>
								<p data-url="attachment/index">图片管理</p>
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
							<!-- <li>
								<p data-url="attachment/banner/index">配置</p>
							</li> -->
						</ul>
					</li>
				</ul>
			</div>
			<div class="content-container table-cell vt">
				<div class="content-body" id="content-body"></div>
			</div>
		</div>
	</div>
</body>
</html>