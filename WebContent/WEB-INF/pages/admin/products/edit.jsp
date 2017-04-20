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
<link rel="stylesheet" href="<%=basePath %>resources/css/admin/product-edit.css?<%=new Date().getTime()%>">
<script src="<%=basePath%>resources/js/admin/product/edit.js?<%=new Date().getTime()%>"></script>

<div class="product-modal">
	<div class="title">基本属性:</div>
	<div class="clearfix p10 base-property-container">
		<!-- 隐藏product-id -->
		<input type="hidden" id="product-id" value="${id}" />
		<div class="form-group col-4">
			<label class="label-5">名称:</label>
			<div class="form-control right-10">
				<input type="text" id="product-name" />
			</div>
			<span class="must">*</span>
		</div>
		<div class="form-group col-4 hide">
			<label class="label-5">编号:</label>
			<div class="form-control">
				<input type="text" id="product-code" readonly />
			</div>
			<span class="must">*</span>
		</div>
		<div class="form-group col-4">
			<label class="label-5">价格:</label>
			<div class="form-control">
				<input type="text" id="product-price" />
			</div>
			<span class="must">*</span>
		</div>
		<div class="form-group col-4">
			<label class="label-5">特价:</label>
			<div class="form-control">
				<input type="text" id="product-special-price" />
			</div>
			<span class="must">*</span>
		</div>
		<div class="form-group col-4 hide">
			<label class="label-5">是否有效:</label>
			<div class="form-control">
				<select id="product-is-valid">
					<option value="Y">有效</option>
					<option value="N">无效</option>
				</select>
			</div>
		</div>
		<div class="form-group col-4">
			<label class="label-5">库存:</label>
			<div class="form-control">
				<input type="text" id="product-count" />
			</div>
			<span class="must">*</span>
		</div>
		<div class="form-group col-4">
			<label class="label-5">属性分类:</label>
			<div class="form-control">
				<input type="text" id="product-category" readonly />
			</div>
		</div>
		<button class="btn btn-primary ml30" id="select-category">选择属性分类</button>
	</div>
	<div class="title">商品自定义属性:</div>
	<div class="product-property-container empty" data-empty="请添加商品属性" id="product-property-container"></div>
	<div class="title">商品图片:</div>
	<div class="img-container clearfix" id="img-container">
		<div class="img-add pull-left" id="img-add"></div>
	</div>
	<div class="mt20 text-center">
		<button class="btn btn-primary btn-2" id="saveOrUpdate">保存</button>
		<button class="btn btn-danger btn-2 ml10" id="save-cancel">取消</button>
	</div>
</div>
<div class="z-modal hide" id="category-modal">
	<div class="z-modal-body category-modal">
		<div class="clearfix category-list empty" id="category-list" data-empty="没有属性分类"></div>
		<div class="text-center p30">
			<button class="btn btn-danger btn-2" id="close-category-modal">关闭</button>
		</div>
	</div>
</div>
<div class="z-modal hide" id="property-modal">
	<div class="z-modal-body property-modal">
		<div class="clearfix property-list empty" id="property-list" data-empty="没有商品属性"></div>
		<div class="text-center p30">
			<button class="btn btn-primary btn-2" id="close-property-modal">关闭</button>
		</div>
	</div>
</div>
<div class="z-modal hide" id="image-modal">
	<div class="z-modal-body image-modal">
		<div class="clearfix p10">
			<div class="pull-left">
				<button class="btn add-btn btn-primary">添加图片</button>
				<span>请上传jpg、png、jpeg格式的图片，最大1M</span>
			</div>
		</div>
		<div class="clearfix">
			<div class="source-container ml10 pull-left">
				<img class="source-image">
			</div>		
			<div class="preview-container ml10 pull-left">
				<img class="preview-image">
			</div>
			<div class="result-container ml10 pull-left">
				<img class="result-image">
			</div>
		</div>
		<div class="center mt15">
			<button class="btn btn-primary" id="select-img-from-source">从资源库选择图片</button>
			<button class="btn btn-primary update-btn btn-2 hide ml20">确定</button>
			<button class="btn btn-primary btn-2 save-btn ml20">确定</button>
			<button class="btn btn-danger btn-2 ml20 cancel-btn">取消</button>
		</div>
	</div>
</div>
<div class="z-modal hide" id="image-list-modal">
	<div class="z-modal-body image-list-modal">
		<div class="image-list empty clearfix" data-empty="暂无图片" id="image-list"></div>
		<div class="text-center mt20">
			<button class="btn btn-primary btn-2" id="sure-image-list-modal">确定</button>
			<button class="btn btn-danger btn-2 ml20" id="close-image-list-modal">关闭</button>
		</div>
	</div>
</div>