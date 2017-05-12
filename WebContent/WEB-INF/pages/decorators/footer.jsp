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
	<script src="<%=basePath%>resources/js/user/header.js"></script>
	<script type="text/javascript">
		var base_url = '<%=basePath%>';
	</script>

</head>
<body>
	<div class="footer">
		<div class="w1200 clearfix"></div>
	</div>
</body>
</html>