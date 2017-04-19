package com.cn.dao;

import java.util.List;

import com.cn.base.BaseDao;
import com.cn.entity.AttachmentObj;

public interface AttachmentObjDao extends BaseDao<AttachmentObj> {

	public void deleteByObjId(Integer typeId, Integer objId);
	
	public void save(Integer attachmentId, Integer objId, Integer typeId, int created_by);
	
	// code 1:材料图片	2:商品图片
	public List<String> getUrlsByObjIdAndCode(Integer objId, Integer code);
	
}