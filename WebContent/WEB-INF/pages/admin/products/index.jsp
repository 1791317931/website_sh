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
<link rel="stylesheet" href="<%=basePath %>resources/css/admin/product.css?<%=new Date().getTime()%>">
<script src="<%=basePath%>resources/js/admin/product/product.js?<%=new Date().getTime()%>"></script>

<div class="product-container p10">
	<div class="clearfix">
		<label class="pull-left lh36">
			<span>商品名称:</span><input class="control-input" type="text" placeholder="请输入商品名称" />
		</label>
		<label class="pull-left lh36 ml20">
			<span>商品编号:</span><input class="control-input" type="text" placeholder="请输入商品编号" />
		</label>
		<button class="btn btn-primary ml20">添加商品</button>
	</div>
	<div class="product-list empty mt10" id="product-list" data-empty="暂无数据"></div>
</div>