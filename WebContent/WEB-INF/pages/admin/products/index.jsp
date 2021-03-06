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

<div class="product-container">
	<div class="clearfix pv10">
		<div class="form-group col-3">
			<label class="label-4">商品名称:</label>
			<div class="form-control">
				<input type="text" placeholder="请输入商品名称" id="search-name" />
			</div>
		</div>
		<div class="form-group col-3">
			<label class="label-4">商品编号:</label>
			<div class="form-control">
				<input type="text" placeholder="请输入商品编号" id="search-code" />
			</div>
		</div>
		<button class="btn btn-primary ml20" id="add-product">添加商品</button>
	</div>
	<div class="product-list empty mt10" id="product-list" data-empty="暂无数据"></div>
</div>
<div class="z-modal hide" id="product-modal">
	<div class="z-modal-body product-modal">
		<form id="readonly-form">
			<div class="clearfix p10 base-property-container">
				<div class="title">基本属性:</div>
				<div class="form-group col-4">
					<label class="label-5">名称:</label>
					<div class="form-control">
						<input type="text" id="product-name" readonly />
					</div>
				</div>
				<div class="form-group col-4 hide">
					<label class="label-5">编号:</label>
					<div class="form-control">
						<input type="text" id="product-code" readonly />
					</div>
				</div>
				<div class="form-group col-4">
					<label class="label-5">价格:</label>
					<div class="form-control">
						<input type="text" id="product-price" readonly />
					</div>
				</div>
				<div class="form-group col-4">
					<label class="label-5">特价:</label>
					<div class="form-control">
						<input type="text" id="product-special-price" readonly />
					</div>
				</div>
				<div class="form-group col-4 hide">
					<label class="label-5">是否有效:</label>
					<div class="form-control">
						<select id="product-is-valid" readonly>
							<option value="Y">有效</option>
							<option value="N">无效</option>
						</select>
					</div>
				</div>
				<div class="form-group col-4">
					<label class="label-5">库存:</label>
					<div class="form-control right-10">
						<input type="text" id="product-count" readonly />
					</div>
				</div>
				<div class="form-group col-4">
					<label class="label-5">属性分类:</label>
					<div class="form-control right-10">
						<input type="text" id="category-name" readonly />
					</div>
				</div>
			</div>
			<div class="title">商品自定义属性:</div>
			<div class="product-property-container empty" data-empty="请添加商品属性" id="product-property-container"></div>
			<div class="title">商品图片:</div>
			<div class="img-container clearfix" id="img-container"></div>
			<div class="mt20 text-center">
				<button class="btn btn-danger btn-2" type="button" id="save-cancel">关闭</button>
			</div>
		</form>
	</div>
</div>