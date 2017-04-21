package com.cn.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.AttachmentObjDao;
import com.cn.entity.AttachmentObj;
import com.cn.entity.Const;
import com.cn.enums.FileConst;
import com.cn.service.AttachmentObjService;
import com.cn.service.ConstService;

@Service(value = "attachmentObjService")
public class AttachmentObjServiceImpl implements AttachmentObjService {

	@Resource(name = "attachmentObjDao")
	private AttachmentObjDao attachmentObjDao;
	
	@Resource(name = "constService")
	private ConstService constService;
	
	@Override
	public void deleteByParam(Integer typeId, Integer objId) {
		attachmentObjDao.deleteByParam(typeId, objId);
	}

	@Override
	public void save(AttachmentObj attachmentObj) {
		attachmentObjDao.save(attachmentObj);
	}
	
	@Override
	public List<String> getUrlsByObjIdAndCode(Integer objId, Integer code) {
		return attachmentObjDao.getUrlsByObjIdAndCode(objId, code);
	}
	
	@Override
	public void disableLogo() {
		List<Const> list = constService.getByTypeAndCode(FileConst.TYPE, FileConst.LOGO);
		Const con = list.get(0);
		int typeId = con.getId();
		attachmentObjDao.deleteByParam(typeId, null);
	}
	
	@Override
	public void enableLogo(int attachmentId, int created_by) {
		List<Const> list = constService.getByTypeAndCode(FileConst.TYPE, FileConst.LOGO);
		Const con = list.get(0);
		int typeId = con.getId();
		attachmentObjDao.deleteByParam(typeId, null);
		attachmentObjDao.save(attachmentId, 0, typeId, created_by);
	}

}