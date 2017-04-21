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
<link rel="stylesheet" href="<%=basePath %>resources/css/admin/logo.css?<%=new Date().getTime()%>">
<script src="<%=basePath%>resources/js/admin/logo/index.js?<%=new Date().getTime()%>"></script>
<div class="logo-container p10">
	<div class="pt10 pb10">
		<button class="btn btn-primary" id="upload-logo">上传LOGO</button>
	</div>
	<div class="empty logo_list clearfix" id="logo_list" data-empty="暂无LOGO"></div>
</div>
<div class="z-modal hide" id="logo-modal">
	<div class="z-modal-body logo-modal">
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
			<button class="btn btn-primary btn-2 save-btn ml20">确定</button>
			<button class="btn btn-danger btn-2 ml20 cancel-btn">取消</button>
		</div>
	</div>
</div>