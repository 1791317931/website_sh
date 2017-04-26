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
<link rel="stylesheet" href="<%=basePath %>resources/css/admin/product-category-list.css?<%=new Date().getTime()%>">
<script src="<%=basePath%>resources/js/admin/product/product-category-list.js?<%=new Date().getTime()%>"></script>
<div>
	<div class="">
		<button></button>
	</div>
</div>