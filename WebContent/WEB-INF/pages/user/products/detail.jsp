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
	<link rel="stylesheet" href="<%=basePath%>resources/css/user/product-detail.css?<%=new Date().getTime()%>">
	
</head>
<body>
	<jsp:include page="../../decorators/header.jsp" />
	<div class="standard mh500 mt20">
		<input type="hidden" id="product-id" value="${id}" />
		<div class="table wp100 bg-white">
			<div class="table-cell w420">
				<img class="product-detail" />
				<div class="product-scroll mt15 relative"></div>
			</div>
			<div class="table-cell vt">
				<div class="pl10">
					<h2 class="cr center" id="product-name"></h2>
					<div class="property-container clearfix" id="property-container">
						<div class="form-group col-6">
							<label class="label-4">价格:</label>
							<div class="form-control">
								<span class="cr" id="product-price"></span>
							</div>
						</div>
						<div class="form-group col-6">
							<label class="label-4">数量:</label>
							<div class="form-control">
								<span class="cr" id="product-count"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="text-center pt30">
					<button class="btn btn-danger" id="add-shopcar">加入购物车</button>
					<!-- <button class="btn btn-danger ml10">立即购买</button> -->
				</div>
			</div>
		</div>
		<div class="mt20 mb20 container-box">
			<div class="clearfix nav-container">
				<div data-id="comment">相关评论</div>
				<div data-id="product">相关商品</div>
			</div>
			<div class="content-item-container">
				<div class="content-item p10 active" data-id="comment">
					<div class="clearfix">
						<div class="textarea-record">
							<textarea id="comment" placeholder="请输入您的评论"></textarea>
						</div>
						<div class="mt10 pull-right">
							<button class="btn btn-primary btn-2" id="add-comment">保存</button>
							<button class="btn btn-danger btn-2 ml20" id="clear-comment">清空</button>
						</div>
					</div>
					<div class="comment-list empty" data-empty="暂无评论"></div>
					<div class="loading hide">评论加载中...</div>
 			 		<div class="no-more hide">没有更多评论了</div>
				</div>
				<div class="content-item" data-id="product">
					<div class="similar-product empty clearfix" data-empty="暂无同款商品"></div>
					<div class="loading hide">数据加载中...</div>
 			 		<div class="no-more hide">没有更多数据了</div>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="../../decorators/footer.jsp" />
</body>
	<script src="<%=basePath %>resources/js/user/product-detail.js?<%=new Date().getTime()%>"></script>
</html>