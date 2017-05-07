<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>购物车</title>
	<script type="text/javascript">
		var base_url = '<%=basePath%>';
	</script>
	<link rel="stylesheet" href="<%=basePath%>resources/css/user/shop-car.css?<%=new Date().getTime()%>">
	
</head>
<body>
	<jsp:include page="../../decorators/header.jsp" />
	<div class="standard mh500 mt20 container">
		<table class="table-head wp100" border="1" cellpadding="0" cellspacing="0">
			<tr class="cg">
				<td class="w30" align="center">
					<input class="check-all" type="checkbox" />
				</td>
				<td class="w250">商品</td>
				<td>描述</td>
				<td class="w130">单价</td>
				<td class="w130">数量</td>
				<td class="w130">小计</td>
				<td class="w100">操作</td>
			</tr>
		</table>
		<div class="product-list empty table" data-empty="暂无数据"></div>
		<div class="clearfix mt20">
			<button class="btn btn-danger btn-2">结算</button>
			<div class="pull-right pt10 pb10 f20">
				<span>总计：</span><span class="cr">12345</span>
			</div>
		</div>
	</div>
	<jsp:include page="../../decorators/footer.jsp" />
</body>
	<script src="<%=basePath %>resources/js/user/shop-car.js?<%=new Date().getTime()%>"></script>
</html>