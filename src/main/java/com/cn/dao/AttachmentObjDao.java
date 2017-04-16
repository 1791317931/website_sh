package com.cn.dao;

import com.cn.base.BaseDao;
import com.cn.entity.AttachmentObj;

public interface AttachmentObjDao extends BaseDao<AttachmentObj> {

	public void deleteByObjId(Integer typeId, Integer objId);
	
	public void save(Integer attachmentId, Integer objId, Integer typeId, int created_by);
	
}