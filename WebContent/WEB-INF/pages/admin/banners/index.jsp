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

<link rel="stylesheet" href="<%=basePath %>resources/css/admin/banner.css?<%=new Date().getTime()%>">
<script src="<%=basePath%>resources/js/admin/banner/banner.js?<%=new Date().getTime()%>"></script>
<div class="p10">
	<div>
		<button class="btn btn-primary" id="add-banner">新增Banner</button>
	</div>
	<div class="clearfix mt10 banner-list empty" id="bannerList" data-empty="暂无Banner"></div>
</div>
<div class="z-modal hide" id="banner-modal">
	<div class="z-modal-body banner-modal">
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
<div class="z-modal hide" id="sort-modal">
	<div class="z-modal-body sort-modal">
		<input type="hidden" id="attachment-id" />
		<div class="form-group">
			<label class="label-2">排序:</label>
			<div class="form-control r10">
				<input type="text" id="sort" placeholder="请填写排序" />
			</div>
			<span class="must">*</span>
		</div>
		<div class="form-group text-center mt30">
			<button class="btn btn-primary btn-2" id="sort-sure">确定</button>
			<button class="btn btn-danger btn-2 ml10" id="sort-cancel">取消</button>
		</div>
	</div>
</div>