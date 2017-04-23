package com.cn.dao;

import java.util.List;

import com.cn.base.BaseDao;
import com.cn.entity.AttachmentObj;
import com.cn.vo.Page;

public interface AttachmentObjDao extends BaseDao<AttachmentObj> {

	public void deleteByParam(Integer typeId, Integer objId);
	
	public void deleteByAttachmentId(int attachmentId);
	
	public void save(Integer attachmentId, Integer objId, Integer typeId, int created_by);
	
	public List<String> getUrlsByObjIdAndCode(Integer objId, Integer code, String orderBy);
	
	public Page getPageObjByParam(Page page, String type, Integer code, String orderBy);
	
	public List<AttachmentObj> getByAttachmentId(int attachmentId);
	
	public int countByTypeAndCode(String type, int code);
	
	public void updateSortByAttachmentId(int attachmentId, int sort);
	
	
	
	
	
	
	
	// 批量更新状态
	public void updateStatusByParam(String type, int code, String status);
	
	public void updateStatus(int attachmentId, String status);
	
}