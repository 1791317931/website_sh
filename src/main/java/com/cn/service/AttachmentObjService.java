package com.cn.service;

import java.util.List;

import com.cn.entity.AttachmentObj;

public interface AttachmentObjService {

	public void deleteByParam(Integer typeId, Integer objId);
	
	public void save(AttachmentObj attachmentObj);
	
	public List<String> getUrlsByObjIdAndCode(Integer objId, Integer code);
	
	public void disableLogo();
	
	/**
	 * 启用当前LOGO，禁用其它LOGO
	 * @param attachmentId
	 */
	public void enableLogo(int attachmentId, int created_by);
	
}