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
	<title>商品详情页</title>
	<script type="text/javascript">
		var base_url = '<%=basePath%>';
	</script>
	<link rel="stylesheet" href="<%=basePath%>resources/css/user/product-search.css?<%=new Date().getTime()%>">
	
</head>
<body>
	<jsp:include page="../../decorators/header.jsp" />
	<div class="standard mh500 mt20 mb20">
		<input type="hidden" id="product-name" value="${name}" />
		<div class="condition-container p10">
			<div class="category-container table empty" data-empty="暂无商品分类"></div>
			<div class="col-3 ml10 mt10">
				<label class="price-label">价格:</label>
				<input class="price-text" type="text" id="min-price" placeholder="￥" />
				<span>-</span>
				<input class="price-text" type="text" id="max-price" placeholder="￥" />
			</div>
		</div>
		<div class="product-list table empty mt20" data-empty="没有符合条件的商品"></div>
		<div class="loading hide">数据加载中...</div>
  		<div class="no-more hide">没有更多数据了</div>
	</div>
	<jsp:include page="../../decorators/footer.jsp" />
</body>
	<script src="<%=basePath %>resources/js/user/product-search.js?<%=new Date().getTime()%>"></script>
</html>