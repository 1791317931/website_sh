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

<script src="<%=basePath%>resources/js/admin/const/role.js?<%=new Date().getTime()%>"></script>
<div class="p10" id="roleList"></div>