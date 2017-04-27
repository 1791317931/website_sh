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
<div class="p10">
	<div>
		<div class="form-group col-3">
			<label>商品分类:</label>
			<div class="form-control">
				<select id="categorys">
					<option value="">--全部--</option>
				</select>
			</div>
		</div>
		<button class="btn btn-danger btn-2 ml20" id="search">查询</button>
		<button class="btn btn-primary btn-2 ml20" id="edit">设置</button>
	</div>
	<div class="empty category-container" id="category-container" data-empty="暂无商品分类"></div>
</div>
<div class="z-modal hide" id="category-modal">
	<div class="z-modal-body category-modal">
		<div class="clearfix">
			<form id="category-form">
				<div class="form-group">
					<label>商品分类:</label>
					<div class="form-control">
						<select id="categorys-list"></select>
					</div>
				</div>
			</form>
			<button class="btn btn-primary ml20" id="choose-product">选择商品</button>
		</div>
		<div class="empty select-product-list" id="select-product-list" data-empty="暂无商品"></div>
		<div class="text-center mt20">
			<button class="btn btn-primary btn-2" id="save-sure">保存</button>
			<button class="btn btn-danger btn-2 ml20" id="save-cancel">取消</button>
		</div>
	</div>
</div>
<div class="z-modal hide" id="product-modal">
	<div class="z-modal-body product-modal">
		<div class="empty p-list" id="p-list" data-empty="暂无商品"></div>
		<div class="text-center mt20">
			<button class="btn btn-primary btn-2" id="product-list-sure">关闭</button>
			<button class="btn btn-danger btn-2 ml20" id="product-list-cancel">关闭</button>
		</div>
	</div>
</div>