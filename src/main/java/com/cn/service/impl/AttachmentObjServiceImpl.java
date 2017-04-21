package com.cn.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.AttachmentObjDao;
import com.cn.entity.AttachmentObj;
import com.cn.entity.Const;
import com.cn.enums.FileConst;
import com.cn.service.AttachmentObjService;
import com.cn.service.ConstService;
import com.cn.vo.AttachmentObjVO;
import com.cn.vo.Page;

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
	
	@SuppressWarnings("unchecked")
	@Override
	public Page getPageObjByParam(int pageSize, int currentPage, String type,
			Integer code) {
		Page page = new Page(pageSize, currentPage);
		page = attachmentObjDao.getPageObjByParam(page, type, code);
		List<Object[]> list = page.getList();
		if (FileConst.LOGO == code) {
			List<AttachmentObjVO> vos = transformToAttachmentObj(list);
			page.setList(vos);
		}
		return page;
	}
	
	private static List<AttachmentObjVO> transformToAttachmentObj(List<Object[]> list) {
		List<AttachmentObjVO> vos = new ArrayList<AttachmentObjVO>();
		AttachmentObjVO vo = null;
		for (int i = 0, length = list.size(); i < length; i++) {
			vo = new AttachmentObjVO();
			Object[] objs = list.get(i);
			vo.setId(Integer.parseInt(objs[0] + ""));
			vo.setPath(objs[1] + "");
			Object objId = objs[2];
			if (objId != null) {
				vo.setObjId(Integer.parseInt(objId + ""));
			}
			vos.add(vo);
		}
		return vos;
	}
	
	@Override
	public AttachmentObj getById(int id) {
		return attachmentObjDao.get(id);
	}

}