package com.cn.service;

import java.util.List;

import com.cn.entity.Attachment;
import com.cn.vo.Page;

public interface AttachmentService {

	public Page getAttachmentByCode(int pageSize, int currentPage, String type, String code);
	
	public void saveOrUpdate(Attachment attachment);
	
	public List<String> getUrlsByObjIdAndCode(Integer objId, Integer code);
	
}