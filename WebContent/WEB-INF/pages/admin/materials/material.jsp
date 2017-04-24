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
<link rel="stylesheet" href="<%=basePath %>resources/css/admin/material.css?<%=new Date().getTime()%>">
<script src="<%=basePath%>resources/js/admin/material/material.js?<%=new Date().getTime()%>"></script>

<div class="material-container">
	<div class="clearfix pv10">
		<div class="form-group col-3">
			<label class="label-4">材料名称:</label>
			<div class="form-control">
				<input type="text" placeholder="请输入材料名称" id="search-name" />
			</div>
		</div>
		<div class="form-group col-3">
			<label class="label-4">材料编号:</label>
			<div class="form-control">
				<input type="text" placeholder="请输入材料编号" id="search-code" />
			</div>
		</div>
		<button class="btn btn-primary ml20" id="add-material">添加材料</button>
	</div>
	<div class="material-list empty mt10" id="material-list" data-empty="暂无数据"></div>
</div>
<div class="z-modal hide" id="material-modal">
	<div class="z-modal-body material-modal">
		<form id="readonly-form">
			<div class="clearfix p10 base-property-container">
				<div class="title">基本属性:</div>
				<div class="form-group col-4">
					<label class="label-5">名称:</label>
					<div class="form-control">
						<input type="text" id="material-name" readonly />
					</div>
				</div>
				<div class="form-group col-4 hide">
					<label class="label-5">编号:</label>
					<div class="form-control">
						<input type="text" id="material-code" readonly />
					</div>
				</div>
				<div class="form-group col-4">
					<label class="label-5">价格:</label>
					<div class="form-control">
						<input type="text" id="material-price" readonly />
					</div>
				</div>
				<div class="form-group col-4">
					<label class="label-5">特价:</label>
					<div class="form-control">
						<input type="text" id="material-special-price" readonly />
					</div>
				</div>
				<div class="form-group col-4 hide">
					<label class="label-5">是否有效:</label>
					<div class="form-control">
						<select id="material-is-valid" readonly>
							<option value="Y">有效</option>
							<option value="N">无效</option>
						</select>
					</div>
				</div>
				<div class="form-group col-4">
					<label class="label-5">库存:</label>
					<div class="form-control right-10">
						<input type="text" id="material-count" readonly />
					</div>
				</div>
				<div class="form-group col-4">
					<label class="label-5">属性分类:</label>
					<div class="form-control right-10">
						<input type="text" id="category-name" readonly />
					</div>
				</div>
			</div>
			<div class="title">材料自定义属性:</div>
			<div class="material-property-container empty" data-empty="请添加材料属性" id="material-property-container"></div>
			<div class="title">材料图片:</div>
			<div class="img-container clearfix" id="img-container"></div>
			<div class="mt20 text-center">
				<button class="btn btn-danger btn-2" type="button" id="save-cancel">关闭</button>
			</div>
			<div class="title">材料附件:</div>
			<div class="pv10">
				<div class="attachment-container clearfix empty" id="attachment-container" data-empty="暂无附件"></div>
				<div class="text-center pv5">
					<button class="btn btn-primary btn-2" id="add-attachment">新增</button>
				</div>
			</div>
		</form>
	</div>
</div>