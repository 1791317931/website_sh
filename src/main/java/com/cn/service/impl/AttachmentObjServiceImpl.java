package com.cn.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.AttachmentDao;
import com.cn.dao.AttachmentObjDao;
import com.cn.entity.Attachment;
import com.cn.entity.AttachmentObj;
import com.cn.entity.Const;
import com.cn.enums.FileConst;
import com.cn.service.AttachmentObjService;
import com.cn.service.ConstService;
import com.cn.vo.AttachmentObjVO;
import com.cn.vo.Page;

@Service(value = "attachmentObjService")
public class AttachmentObjServiceImpl implements AttachmentObjService {
	
	public static final int MAX_BANNER = 4;

	@Resource(name = "attachmentObjDao")
	private AttachmentObjDao attachmentObjDao;
	
	@Resource(name = "attachmentDao")
	private AttachmentDao attachmentDao;
	
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
	public List<String> getUrlsByObjIdAndCode(Integer objId, Integer code, String orderBy) {
		return attachmentObjDao.getUrlsByObjIdAndCode(objId, code, orderBy);
	}
	
	@Override
	public void disableLogo() {
		List<Const> list = constService.getByTypeAndCode(FileConst.TYPE, FileConst.LOGO, null);
		Const con = list.get(0);
		int typeId = con.getId();
		attachmentObjDao.deleteByParam(typeId, null);
	}
	
	@Override
	public void enableLogo(int attachmentId, int created_by) {
		List<Const> list = constService.getByTypeAndCode(FileConst.TYPE, FileConst.LOGO, null);
		Const con = list.get(0);
		int typeId = con.getId();
		attachmentObjDao.deleteByParam(typeId, null);
		attachmentObjDao.save(attachmentId, 0, typeId, created_by);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Page getPageObjByParam(int pageSize, int currentPage, String type,
			Integer code, String orderBy) {
		Page page = new Page(pageSize, currentPage);
		page = attachmentObjDao.getPageObjByParam(page, type, code, orderBy);
		List<Object[]> list = page.getList();
		if (FileConst.LOGO == code) {
			List<AttachmentObjVO> vos = transformToLogo(list);
			page.setList(vos);
		} else if (FileConst.BANNER == code) {
			List<AttachmentObjVO> vos = transformToBanner(list);
			page.setList(vos);
		}
		return page;
	}
	
	private static List<AttachmentObjVO> transformToLogo(List<Object[]> list) {
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
			Object sort = objs[3];
			if (sort != null) {
				vo.setSort(Integer.parseInt(sort + ""));
			}
			vos.add(vo);
		}
		return vos;
	}
	
	private static List<AttachmentObjVO> transformToBanner(List<Object[]> list) {
		return transformToLogo(list);
	}
	
	@Override
	public AttachmentObj getById(int id) {
		return attachmentObjDao.get(id);
	}
	
	@Override
	public void disableBanner(int attachmentId) {
		attachmentObjDao.deleteByAttachmentId(attachmentId);
	}
	
	@Override
	public Map<String, Object> enableBanner(int attachmentId, int created_by, Integer sort) {
		Map<String, Object> result = new HashMap<String, Object>();
		boolean success = true;
		String msg = "";
		// 如果是启用BANNER，需要判断是否已经达到最大值4个
		if (attachmentObjDao.countByTypeAndCode(FileConst.TYPE, FileConst.BANNER) >= MAX_BANNER) {
			msg = "最多只能启用" + MAX_BANNER + "张Banner图片";
			success = false;
			result.put("success", success);
			result.put("msg", msg);
			return result;
		}
		Date now = new Date();
		AttachmentObj attachmentObj = new AttachmentObj();
		attachmentObj.setCreated_by(created_by);
		attachmentObj.setCreate_date(now);
		attachmentObj.setAttachment_id(attachmentId);
		attachmentObj.setObj_id(0);
		List<Const> conList = constService.getByTypeAndCode(FileConst.TYPE, FileConst.BANNER, null);
		Const con = conList.get(0);
		int typeId = con.getId();
		attachmentObj.setType_id(typeId);
		attachmentObj.setUpdate_date(now);
		attachmentObj.setUpdated_by(created_by);
		
		attachmentObjDao.save(attachmentObj);
		result.put("success", success);
		return result;
	}
	
	@Override
	public Map<String, Object> updateSortByAttachmentId(int attachmentId,
			int sort) {
		Map<String, Object> result = new HashMap<String, Object>();
		boolean success = true;
		String msg = "";
		// 首先校验该Banner是否启用
		if (attachmentObjDao.getByAttachmentId(attachmentId).size() == 0) {
			success = false;
			msg = "请启用后再设置排序";
		} else {
			attachmentObjDao.updateSortByAttachmentId(attachmentId, sort);
		}
		
		result.put("success", success);
		result.put("msg", msg);
		return result;
	}
	
	@Override
	public Map<String, Object> deleteBannerByAttachmentId(int attachmentId) {
		Map<String, Object> result = new HashMap<String, Object>();
		boolean success = true;
		String msg = "";
		// 先判断该Banner是否启用
		if (attachmentObjDao.getByAttachmentId(attachmentId).size() == 0) {
			attachmentDao.delete(attachmentId);
		} else {
			success = false;
			msg = "启用中的Banner无法删除";
		}
		
		result.put("success", success);
		result.put("msg", msg);
		return result;
	}
	
	@Override
	public void saveUserImg(String url, int created_by) {
		Const con = constService.getByTypeAndCode(FileConst.TYPE, FileConst.USER, "user").get(0);
		
		Date now = new Date();
		Attachment attachment = new Attachment();
		attachment.setCon(con);
		attachment.setCreate_date(now);
		attachment.setUpdate_date(now);
		attachment.setCreated_by(created_by);
		attachment.setUpdated_by(created_by);
		attachment.setIs_deleted("N");
		attachment.setPath(url);
		attachmentDao.save(attachment);
		
		AttachmentObj obj = new AttachmentObj();
		obj.setAttachment_id(attachment.getId());
		obj.setCreate_date(now);
		obj.setUpdate_date(now);
		obj.setCreated_by(created_by);
		obj.setUpdated_by(created_by);
		obj.setObj_id(created_by);
		obj.setType_id(con.getId());
		attachmentObjDao.save(obj);
	}
	
}