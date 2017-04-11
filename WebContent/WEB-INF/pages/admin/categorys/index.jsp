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

<link rel="stylesheet" href="<%=basePath %>resources/css/admin/category.css?<%=new Date().getTime()%>">
<script src="<%=basePath%>resources/js/admin/category/category.js?<%=new Date().getTime()%>"></script>

<div class="clearfix pt10 pr10 pb10">
	<div class="form-group col-3">
		<label>分类名称:</label>
		<div class="form-control">
			<input type="text" placeholder="请输入分类名称" id="category-name" />
		</div>
	</div>
	<div class="form-group col-3">
		<label class="label-2">类别:</label>
		<div class="form-control">
			<select id="category-select">
				<option value="">-请选择-</option>
			</select>
		</div>
	</div>
	<div class="form-group col-3">
		<label>是否有效:</label>
		<div class="form-control">
			<select id="valid-list">
				<option value="">-请选择-</option>
				<option value="Y">是</option>
				<option value="N">否</option>
			</select>
		</div>
	</div>
	<button class="btn btn-primary pull-left btn-2 ml20" id="search-category">搜索</button>
	<button class="btn btn-primary pull-left ml20" id="add-category">新增分类</button>
</div>
<div id="categoryList"></div>
<!-- 弹出层，新增或编辑分类 -->
<div class="z-modal hide" id="category-modal">
	<div class="z-modal-body category-modal">
		<input type="hidden" id="category-id" />
		<div class="clearfix">
			<div class="form-group col-4">
				<label class="label-5">分类名称:</label>
				<div class="form-control right-10">
					<input type="text" placeholder="请输入分类名称" id="name" />
				</div>
			</div>
			<div class="form-group col-4">
				<label class="label-5">类别:</label>
				<div class="form-control right-10">
					<select id="category-options"></select>
				</div>
			</div>
			<button class="btn btn-primary pull-left ml20" id="add-property">添加属性</button>
		</div>
		<!-- 做对比用，只是在#select-property-sure点击后判断是否清空#property-container -->
		<input type="hidden" id="hide-type-id" />
		<div class="property-container empty mt20 clearfix" id="property-container" data-empty="当前还没有属性，请添加属性"></div>
		<div class="p20 text-center">
			<button class="btn btn-primary btn-2" id="add-category-sure">确定</button>
			<button class="btn btn-danger btn-2 ml20" id="add-category-cancel">取消</button>
		</div>
	</div>
</div>
<!-- 弹出层，属性列表 -->
<div class="z-modal hide" id="property-modal">
	<div class="z-modal-body property-modal">
		<label class="title p10">选择属性</label>
		<div id="property-list"></div>
		<div class="text-center p20">
			<button class="btn btn-primary btn-2 btn-sg" id="select-property-sure">确定</button>
			<button class="btn btn-primary btn-2 btn-sg ml20" id="select-property-cancel">取消</button>
		</div>
	</div>
</div>