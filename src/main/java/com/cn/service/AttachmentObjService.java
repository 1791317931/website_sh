package com.cn.service;

import java.util.List;

import com.cn.entity.AttachmentObj;

public interface AttachmentObjService {

	public void deleteByObjId(Integer typeId, Integer objId);
	
	public void save(AttachmentObj attachmentObj);
	
	public List<String> getUrlsByObjIdAndCode(Integer objId, Integer code);
	
}