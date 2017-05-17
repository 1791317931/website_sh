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
<link rel="stylesheet" href="<%=basePath %>resources/css/admin/property.css?<%=new Date().getTime()%>">
<script src="<%=basePath%>resources/js/admin/property/property.js?<%=new Date().getTime()%>"></script>

<div>
	<div class="clearfix pt10 pl10">
		<button class="btn btn-primary" id="add-property">新建属性</button>
	</div>
	<div class="property-list" id="property-list"></div>
	<div class="z-modal hide" id="property-modal">
		<div class="z-modal-body property-body p30">
			<div class="property-form">
				<form id="property-form">
					<input type="hidden" id="propertyId" value="" />
					<div class="clearfix">
						<div class="form-group">
							<label>属性名称:</label>
							<div class="form-control">
								<input type="text" id="name" name="name" placeholder="请输入属性名称" />
							</div>
						</div>
						<div class="form-group">
							<label>属性分类:</label>
							<div class="form-control">
								<select name="category-list" id="category-list"></select>
							</div>
						</div>
						<div class="form-group">
							<label class="pull-left">是否必填:</label>
							<div class="pull-left ml15">
								<label class="radio-item" for="value3">
									<div class="table-cell">
										<input type="radio" id="value3" value="Y" name="is_must" checked/>
										<span class="radio"></span>
									</div>
									<span class="table-cell pl5">是</span>
								</label>
							</div>
							<div class="pull-left ml5">
								<label class="radio-item ml5" for="value4">
									<div class="table-cell">
										<input type="radio" id="value4" value="N" name="is_must"/>
										<span class="radio"></span>
									</div>
									<span class="table-cell pl5">否</span>
								</label>
							</div>
						</div>
					</div>
					<div class="text-center mt30">
						<button class="btn btn-primary btn-2" type="button" id="save">保存</button>
						<button class="btn btn-danger btn-2 ml20" type="button" id="cancel">取消</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>