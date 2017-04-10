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
	<title>电商首页</title>
	<script type="text/javascript">
		var base_url = '<%=basePath%>';
	</script>
	<link rel="stylesheet" href="<%=basePath%>resources/css/common/horizontal-slide.css?<%=new Date().getTime()%>">
	<link rel="stylesheet" href="<%=basePath%>resources/css/user/main.css?<%=new Date().getTime()%>">
</head>
<body>
	<jsp:include page="../decorators/header.jsp" />
	<div class="standard">
		<div class="banner"></div>
		<div class="product-list pt20 pb20 empty">
			<div class="clearfix mb30">
				<h4 class="mb10 product-category">
					推荐商品
				</h4>
				<div class="product-item">
					<a href="<%=basePath%>product/user/index?id=1">
						<img src="<%=basePath %>resources/imgs/1.jpg" />
					</a>
				</div>
				<div class="product-item">
					<img src="<%=basePath %>resources/imgs/2.jpg" />
				</div>
				<div class="product-item">
					<img src="<%=basePath %>resources/imgs/3.jpg" />
				</div>
				<div class="product-item">
					<img src="<%=basePath %>resources/imgs/4.jpg" />
				</div>
				<div class="product-item">
					<img src="<%=basePath %>resources/imgs/5.jpg" />
				</div>
			</div>
			<div class="clearfix mb20">
				<h4 class="mb10 product-category">
					推荐商品1
				</h4>
				<div class="product-item">
					<img src="<%=basePath %>resources/imgs/6.jpg" />
				</div>
				<div class="product-item">
					<img src="<%=basePath %>resources/imgs/7.jpg" />
				</div>
				<div class="product-item">
					<img src="<%=basePath %>resources/imgs/8.jpg" />
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="../decorators/footer.jsp" />
</body>
	<script src="<%=basePath %>resources/js/user/main.js?<%=new Date().getTime()%>"></script>
</html>