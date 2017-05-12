package com.cn.service;

import java.util.List;
import java.util.Map;

import com.cn.entity.AttachmentObj;
import com.cn.vo.Page;

public interface AttachmentObjService {

	public void deleteByParam(Integer typeId, Integer objId);
	
	public void save(AttachmentObj attachmentObj);
	
	public List<String> getUrlsByObjIdAndCode(Integer objId, Integer code, String orderBy);
	
	public void disableLogo();
	
	/**
	 * 启用当前LOGO，禁用其它LOGO
	 * @param attachmentId
	 */
	public void enableLogo(int attachmentId, int created_by);
	
	public Page getPageObjByParam(int pageSize, int currentPage, String type, Integer code, String orderBy);
	
	public AttachmentObj getById(int id);
	
	public void disableBanner(int attachmentId);
	
	public Map<String, Object> enableBanner(int attachmentId, int created_by, Integer sort);
	
	public Map<String, Object> updateSortByAttachmentId(int attachmentId, int sort);
	
	public Map<String, Object> deleteBannerByAttachmentId(int attachmentId);
	
	public void saveUserImg(String url, int created_by);
	
}