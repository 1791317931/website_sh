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
	<link rel="stylesheet" href="<%=basePath%>resources/css/common/horizontal-slide.css?<%=new Date().getTime()%>">
	<link rel="stylesheet" href="<%=basePath%>resources/css/user/product.css?<%=new Date().getTime()%>">
	
</head>
<body>
	<jsp:include page="../../decorators/header.jsp" />
	<div class="standard mh500 mt20">
		<div class="table wp100 bg-white p15">
			<div class="table-cell w420">
				<img class="product-detail" src="<%=basePath %>resources/imgs/5.jpg" />
				<div class="product-scroll mt15 relative"></div>
			</div>
			<div class="table-cell vt">
				<div class="pl10">
					<h2 class="cr">商品名称</h2>
					<div class="cg prop-r">
						<div>
							价格：<span class="cr">1234（￥）</span>
						</div>
						<div>
							尺寸：<span>中等</span>
						</div>
						<div>
							颜色：<span>天蓝</span>
						</div>
						<div>
							备注：<span>灯，照明用品，泛指可以照亮的用具。人类远古时代用火把照明，后来有了蜡烛和油灯。在古时“烛”是一种由易燃材料制成的火把，
							用于执持的已被点燃的火把，称之为烛；放在地上的用来点燃的成堆细草和树枝叫做燎，燎置于门外的称大烛，门内的则称庭燎。</span>
						</div>
						<div class="text-center pt20">
							<button class="btn btn-danger">加入购物车</button>
							<!-- <button class="btn btn-danger ml10">立即购买</button> -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mt20 mb20">
			<div class="clearfix nav-container">
				<div class="active" data-id="comment">相关评论</div>
				<div data-id="product">相关商品</div>
			</div>
			<div class="p10 content-item-container">
				<div class="content-item active" data-id="comment">
					相关评论内容
				</div>
				<div class="content-item" data-id="product">
					相关商品内容
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="../../decorators/footer.jsp" />
</body>
	<script src="<%=basePath %>resources/js/user/product.js?<%=new Date().getTime()%>"></script>
</html>