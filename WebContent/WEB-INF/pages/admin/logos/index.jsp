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
<link rel="stylesheet" href="<%=basePath %>resources/css/admin/logo.css?<%=new Date().getTime()%>">
<script src="<%=basePath%>resources/js/admin/logo/index.js?<%=new Date().getTime()%>"></script>
<div class="logo-container p10">
	<div class="mt20 empty logo_list clearfix" id="logo_list" data-empty="暂无LOGO"></div>
</div>