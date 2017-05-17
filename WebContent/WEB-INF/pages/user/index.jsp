<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>用户中心</title>
	<script type="text/javascript">
		var base_url = '<%=basePath%>';
	</script>
	<link rel="stylesheet" href="<%=basePath%>resources/css/user/index.css?<%=new Date().getTime()%>">
</head>
<body>
	<jsp:include page="../decorators/header.jsp" />
	<div class="standard clearfix mb20">
		<div class="menu-container">
			<div class="relative user-img-container pointer">
				<img class="user-img" />
				<p class="edit-img">编辑</p>
			</div>
			<ul class="menu">
				<li data-type="user-info">
					<p>资料编辑</p>
				</li>
				<li data-type="password-edit">
					<p>密码修改</p>
				</li>
			</ul>
		</div>
		<div class="content-body p30">
			<div class="item" data-type="user-info">
				<div class="clearfix col-4 margin-auto">
					<form id="userForm">
						<div class="form-group">
							<label class="label-4">用户名:</label>
							<div class="form-control r10">
								<input type="text" id="name" />
							</div>
						</div>
						<div class="form-group">
							<label class="label-4">真实姓名:</label>
							<div class="form-control r10">
								<input type="text" id="realname" />
							</div>
						</div>
						<div class="form-group">
							<label class="label-4">手机号:</label>
							<div class="form-control r10">
								<input type="text" id="tel" />
							</div>
							<span class="must">*</span>
						</div>
						<div class="form-group">
							<label class="label-4">年龄:</label>
							<div class="form-control r10">
								<input type="text" id="age" />
							</div>
						</div>
						<div class="form-group">
							<label class="label-4">性别:</label>
							<label class="ml5 pointer" for="man">
								<input class="sex" type="radio" id="man" value="1" />
								<span>男</span>
							</label>
							<label class="ml5 pointer" for="woman">
								<input class="sex" type="radio" id="woman" value="2"/>
								<span>女</span>
							</label>
						</div>
					</form>
					<div class="form-group mt20">
						<label class="label-4">&nbsp;</label>
						<button class="btn btn-primary btn-2" id="update-info-sure">确定</button>
						<button class="btn btn-danger btn-2 ml20" id="update-info-clear">清空</button>
					</div>
				</div>
			</div>
			<div class="item" data-type="password-edit">
				<div class="clearfix pl30">
					<label class="pull-left lh40">修改密码:</label>
					<div class="password-progress pull-left ml10"></div>
				</div>
				<div class="clearfix col-4 update-password-container">
					<div class="old-password-container">
						<div class="form-group">
							<label class="label-4">原密码:</label>
							<div class="form-control r10">
								<input type="password" id="old-password" />
							</div>
							<span class="must">*</span>
						</div>
						<div class="form-group mt30">
							<label class="label-4">&nbsp;</label>
							<button class="btn btn-primary btn-2" id="old-password-sure">确定</button>
							<button class="btn btn-danger btn-2 ml20" id="old-password-clear">清空</button>
						</div>
					</div>
					<div class="new-password-container hide">
						<div class="form-group">
							<label class="label-4">新密码:</label>
							<div class="form-control r10">
								<input type="password" id="new-password" />
							</div>
							<span class="must">*</span>
						</div>
						<div class="form-group">
							<label class="label-4">确认密码:</label>
							<div class="form-control r10">
								<input type="password" id="new-same-password" />
							</div>
							<span class="must">*</span>
						</div>
						<div class="form-group mt30">
							<label class="label-4">&nbsp;</label>
							<button class="btn btn-primary btn-2" id="new-password-sure">确定</button>
							<button class="btn btn-danger btn-2 ml20" id="new-password-clear">清空</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="../decorators/footer.jsp" />
	<div class="z-modal hide" id="head-img-modal">
		<div class="z-modal-body head-img-modal">
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
				<button class="btn btn-primary btn-2 save-btn">确定</button>
				<button class="btn btn-danger btn-2 ml20 cancel-btn">取消</button>
			</div>
		</div>
	</div>
</body>
	<script src="<%=basePath %>resources/js/user/index.js?<%=new Date().getTime()%>"></script>
</html>