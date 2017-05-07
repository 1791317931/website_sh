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
	<link rel="stylesheet" href="<%=basePath%>resources/css/user/main.css?<%=new Date().getTime()%>">
</head>
<body>
	<jsp:include page="../decorators/header.jsp" />
	<div class="standard">
		<div class="banner-container" id="banner-container">
			<div class="banner-body clearfix" id="banner"></div>
			<div class="banner-footer text-center" id="banner-footer"></div>
		</div>
		<div class="product-list pv20 empty" id="product-list"></div>
	</div>
	<jsp:include page="../decorators/footer.jsp" />
</body>
	<script src="<%=basePath %>resources/js/user/main.js?<%=new Date().getTime()%>"></script>
</html>