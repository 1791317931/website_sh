package com.cn.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.AttachmentDao;
import com.cn.entity.Attachment;
import com.cn.service.AttachmentService;
import com.cn.vo.Page;

@Service(value = "attachmentService")
public class AttachmentServiceImpl implements AttachmentService {
	
	@Resource(name = "attachmentDao")
	private AttachmentDao attachmentDao;

	@Override
	public Page getAttachmentByCode(int pageSize, int currentPage, String type, String code) {
		Page page = new Page(pageSize, currentPage);
		return attachmentDao.getPageByCode(page, type, code);
	}
	
	public void saveOrUpdate(Attachment attachment) {
		attachmentDao.save(attachment);
	}
	
}