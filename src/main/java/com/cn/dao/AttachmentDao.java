package com.cn.dao;

import com.cn.base.BaseDao;
import com.cn.entity.Attachment;
import com.cn.vo.Page;

public interface AttachmentDao extends BaseDao<Attachment> {
	
	public Page getPageByCode(Page page, String type, Integer code);
	
}