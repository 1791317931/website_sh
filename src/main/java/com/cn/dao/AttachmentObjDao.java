package com.cn.dao;

import java.util.List;

import com.cn.base.BaseDao;
import com.cn.entity.AttachmentObj;

public interface AttachmentObjDao extends BaseDao<AttachmentObj> {

	public void deleteByParam(Integer typeId, Integer objId);
	
	public void save(Integer attachmentId, Integer objId, Integer typeId, int created_by);
	
	public List<String> getUrlsByObjIdAndCode(Integer objId, Integer code);
	
	
	
	
	
	
	
	// 批量更新状态
	public void updateStatusByParam(String type, int code, String status);
	
	public void updateStatus(int attachmentId, String status);
	
}