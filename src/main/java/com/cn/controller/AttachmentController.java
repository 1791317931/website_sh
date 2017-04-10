package com.cn.controller;

import java.util.Date;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.base.BaseController;
import com.cn.entity.Attachment;
import com.cn.entity.Const;
import com.cn.service.AttachmentService;

@Controller
@RequestMapping(value = "/attachment")
public class AttachmentController extends BaseController {

	@Resource(name = "attachmentService")
	private AttachmentService attachmentService;
	
	@RequestMapping(value = "/index")
	public String index() {
		return "admin/attachments/index";
	}
	
	@RequestMapping(value = "/page")
	@ResponseBody
	public Map<String, Object> getPageByCode(int pageSize, int currentPage, String type, String code) {
		return getMap(attachmentService.getAttachmentByCode(pageSize, currentPage, type, code));
	}
	
	@RequestMapping(value = "/saveOrUpdate")
	@ResponseBody
	public Map<String, Object> saveOrUpdate(Attachment attachment, Integer typeId) {
		Const con = new Const();
		con.setId(typeId);
		
		Date now = new Date();
		attachment.setUpdate_date(now);
		// TODO
		int createBy = 1;
		attachment.setUpdated_by(createBy);
		if(attachment.getId() == null) {
			attachment.setCreate_date(now);
			attachment.setCreated_by(createBy);
			attachment.setIs_deleted("N");
		}
		attachment.setCon(con);
		attachmentService.saveOrUpdate(attachment);
		return getMap(null);
	}
	
}