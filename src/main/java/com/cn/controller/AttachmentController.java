package com.cn.controller;

import java.util.Date;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.base.BaseController;
import com.cn.entity.Attachment;
import com.cn.entity.Const;
import com.cn.service.AttachmentObjService;
import com.cn.service.AttachmentService;
import com.cn.service.ConstService;

@Controller
@RequestMapping(value = "/attachment")
public class AttachmentController extends BaseController {

	@Resource(name = "attachmentService")
	private AttachmentService attachmentService;
	
	@Resource(name = "constService")
	private ConstService constService;
	
	@Resource(name = "attachmentObjService")
	private AttachmentObjService attachmentObjService;
	
	@RequestMapping(value = "/index")
	public String index() {
		return "admin/attachments/index";
	}

	@RequestMapping(value = "/logo/index")
	public String logoIndex() {
		return "admin/logos/index";
	}
	
	@RequestMapping(value = "/banner/index")
	public String bannerIndex() {
		return "admin/banners/index";
	}
	
	@RequestMapping(value = "/page")
	@ResponseBody
	public Map<String, Object> getPageByCode(int pageSize, int currentPage, 
			String type, Integer code, String status) {
		return getMap(attachmentService.getAttachmentByCode(pageSize, currentPage, type, code));
	}
	
	@RequestMapping(value = "/page/vo")
	@ResponseBody
	public Map<String, Object> getPageVOByCode(
			@RequestParam(defaultValue = "10") int pageSize,
			@RequestParam(defaultValue = "1") int currentPage, 
			String type, Integer code, String orderBy) {
		return getMap(attachmentObjService.getPageObjByParam(pageSize, currentPage, type, code, orderBy));
	}
	
	/**
	 * 禁用logo，只有一个logo会被启用，所以禁用时，不需要传递id
	 * @param logoId
	 * @return
	 */
	@RequestMapping(value = "/logo/disable")
	@ResponseBody
	public Map<String, Object> disableLogo() {
		attachmentObjService.disableLogo();
		return getMap(null);
	}
	
	/**
	 * 启用logo，会禁用其它logo
	 * @param logoId
	 * @return
	 */
	@RequestMapping(value = "/logo/enable")
	@ResponseBody
	public Map<String, Object> endableLogo(int attachmentId) {
		attachmentObjService.enableLogo(attachmentId, created_by);
		return getMap(null);
	}
	
	/**
	 * 删除LOGO
	 * @param attachmentId
	 * @return
	 */
	@RequestMapping(value = "/logo/delete")
	@ResponseBody
	public Map<String, Object> deleteById(int attachmentId) {
		Map<String, Object> result = attachmentService.deleteLogoById(attachmentId);
		return getMap(result);
	}
	
	/**
	 * 禁用banner
	 * @param attachmentId
	 * @return
	 */
	@RequestMapping(value = "/banner/disable")
	@ResponseBody
	public Map<String, Object> disableLogo(int attachmentId) {
		attachmentObjService.disableBanner(attachmentId);
		return getMap(null);
	}
	
	/**
	 * 启用或修改banner
	 * @param logoId
	 * @return
	 */
	@RequestMapping(value = "/banner/saveOrUpdate")
	@ResponseBody
	public Map<String, Object> saveOrUpdateBanner(int attachmentId, Integer sort) {
		Map<String, Object> result = attachmentObjService.enableBanner(attachmentId, created_by, sort);
		return getMap(result);
	}
	
	@RequestMapping(value = "/banner/updateSort")
	@ResponseBody
	public Map<String, Object> updateSortByAttachmentId(int attachmentId, int sort) {
		Map<String, Object> result = attachmentObjService.updateSortByAttachmentId(attachmentId, sort);
		return getMap(result);
	}
	
	@RequestMapping(value = "/banner/delete")
	@ResponseBody
	public Map<String, Object> deleteBannerByAttachmentId(int attachmentId) {
		Map<String, Object> result = attachmentObjService.deleteBannerByAttachmentId(attachmentId);
		return getMap(result);
	}
	
	@RequestMapping(value = "/saveOrUpdate")
	@ResponseBody
	public Map<String, Object> saveOrUpdate(Attachment attachment, Integer typeId) {
		
		Date now = new Date();
		attachment.setUpdate_date(now);
		attachment.setUpdated_by(created_by);
		if(attachment.getId() == null) {
			Const con = constService.getById(typeId);
			attachment.setCon(con);
			attachment.setCreate_date(now);
			attachment.setCreated_by(created_by);
			attachment.setIs_deleted("N");
		}
		attachmentService.saveOrUpdate(attachment);
		return getMap(null);
	}
	
}