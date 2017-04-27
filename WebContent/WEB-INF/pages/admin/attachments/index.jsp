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
<link rel="stylesheet" href="<%=basePath %>resources/css/admin/attachment.css?<%=new Date().getTime()%>">
<script src="<%=basePath%>resources/js/admin/attachment/attachment.js?<%=new Date().getTime()%>"></script>

<div class="img-container p10">
	<div class="clearfix ml-10">
		<div class="form-group col-3">
			<label class="label-2">分类:</label>
			<div class="form-control">
				<select id="category-list"></select>
			</div>
		</div>
		<button class="btn btn-primary ml20" id="add-img">点击添加图片</button>
	</div>
	<div class="mt20 empty attachment_list clearfix" id="attachment_list" data-empty="暂无图片"></div>
	<div class="loading hide">数据加载中...</div>
	<div class="no-more hide">没有更多数据了</div>
	<div class="z-modal hide" id="clip-modal">
		<div class="z-modal-body clip-image-container">
			<div class="clearfix p10">
				<div class="pull-left">
					<button class="btn add-btn btn-primary">添加图片</button>
					<span>请上传jpg、png、jpeg格式的图片，最大1M</span>
				</div>
				<div class="form-group pull-right col-5">
					<label class="label-5">请选择分类:</label>
					<div class="form-control">
						<select class="ml5" id="category-list-sub"></select>
					</div>
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
				<button class="btn btn-primary btn-2 save-btn">保存</button>
				<button class="btn btn-danger btn-2 ml20 cancel-btn">取消</button>
			</div>
		</div>
	</div>
</div>