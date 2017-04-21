package com.cn.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.AttachmentDao;
import com.cn.dao.AttachmentObjDao;
import com.cn.entity.Attachment;
import com.cn.service.AttachmentObjService;
import com.cn.service.AttachmentService;
import com.cn.vo.Page;

@Service(value = "attachmentService")
public class AttachmentServiceImpl implements AttachmentService {
	
	@Resource(name = "attachmentDao")
	private AttachmentDao attachmentDao;
	
	@Resource(name = "attachmentObjDao")
	private AttachmentObjDao attachmentObjDao;
	
	@Resource(name = "attachmentObjService")
	private AttachmentObjService attachmentObjService;

	@Override
	public Page getAttachmentByCode(int pageSize, int currentPage, String type, Integer code) {
		Page page = new Page(pageSize, currentPage);
		return attachmentDao.getPageByCode(page, type, code);
	}
	
	public void saveOrUpdate(Attachment attachment) {
		attachmentDao.save(attachment);
	}
	
	public List<String> getUrlsByObjIdAndCode(Integer objId, Integer code) {
		return attachmentObjDao.getUrlsByObjIdAndCode(objId, code);
	}
	
	@Override
	public void deleteById(int id) {
		attachmentDao.delete(id);
	}
	
	/**
	 * 需要先验证该LOGO是否已启用
	 */
	@Override
	public Map<String, Object> deleteLogoById(int id) {
		Map<String, Object> result = new HashMap<String, Object>();
		boolean success = true;
		String msg = "";
		
		if (attachmentObjService.getById(id) == null) {
			attachmentObjService.deleteByParam(null, id);
			attachmentDao.delete(id);
		} else {
			msg = "该LOGO已经被启用";
			success = false;
		}
		
		result.put("success", success);
		result.put("msg", msg);
		return result;
	}
	
}