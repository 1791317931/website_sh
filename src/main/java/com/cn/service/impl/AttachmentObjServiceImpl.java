package com.cn.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.AttachmentObjDao;
import com.cn.entity.AttachmentObj;
import com.cn.service.AttachmentObjService;

@Service(value = "attachmentObjService")
public class AttachmentObjServiceImpl implements AttachmentObjService {

	@Resource(name = "attachmentObjDao")
	private AttachmentObjDao attachmentObjDao;
	
	@Override
	public void deleteByObjId(Integer typeId, Integer objId) {
		attachmentObjDao.deleteByObjId(typeId, objId);
	}

	@Override
	public void save(AttachmentObj attachmentObj) {
		attachmentObjDao.save(attachmentObj);
	}

}