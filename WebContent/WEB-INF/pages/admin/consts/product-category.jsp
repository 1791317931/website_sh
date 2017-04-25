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
<link rel="stylesheet" href="<%=basePath %>resources/css/admin/product-category.css?<%=new Date().getTime()%>">
<script src="<%=basePath%>resources/js/admin/const/product-category.js?<%=new Date().getTime()%>"></script>
<div class="p10">
	<div>
		<button class="btn btn-primary btn-2" id="add-product-category">新增</button>
	</div>
	<div class="empty product-category-list mt10" id="product-category-list" data-empty="暂无商品分类"></div>
</div>
<div class="z-modal hide" id="category-edit-modal">
	<div class="z-modal-body category-edit-modal">
		<form id="product-category-form">
			<input type="hidden" id="category-id" />
			<div class="form-group">
				<label>分类编号:</label>
				<div class="form-control r10">
					<input type="text" id="category-code" placeholder="请输入编号" />
				</div>
				<span class="must">*</span>
			</div>
			<div class="form-group">
				<label>分类标识:</label>
				<div class="form-control r10">
					<input type="text" id="category-value" placeholder="请输入标识" />
				</div>
				<span class="must">*</span>
			</div>
			<div class="form-group">
				<label>分类描述:</label>
				<div class="form-control r10">
					<input type="text" id="category-desc" placeholder="请输入描述" />
				</div>
				<span class="must">*</span>
			</div>
		</form>
		<div class="form-group text-center mt30">
			<button class="btn btn-primary btn-2" id="add-product-category-sure">确定</button>
			<button class="btn btn-danger btn-2 ml20" id="add-product-category-cancel">取消</button>
		</div>
	</div>
</div>