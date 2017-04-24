package com.cn.service;

import java.util.List;
import java.util.Map;

import com.cn.entity.Attachment;
import com.cn.vo.Page;

public interface AttachmentService {

	public Page getAttachmentByCode(int pageSize, int currentPage, String type, Integer code);
	
	public void saveOrUpdate(Attachment attachment);
	
	public List<String> getUrlsByObjIdAndCode(Integer objId, Integer code, String orderBy);
	
	public void deleteById(int id);
	
	public Map<String, Object> deleteLogoById(int id);
	
	public List<Integer> batchSave(String urls[], String type, int code, int created_by);
	
}