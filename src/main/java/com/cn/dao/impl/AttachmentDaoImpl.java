package com.cn.dao.impl;

import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.AttachmentDao;
import com.cn.entity.Attachment;
import com.cn.vo.Page;

@Repository(value = "attachmentDao")
public class AttachmentDaoImpl extends BaseDaoImpl<Attachment> implements AttachmentDao {

	public AttachmentDaoImpl() {
		super(Attachment.class);
	}

	public Page getPageByCode(Page page, String type, Integer code) {
		String sql = "from Attachment a where a.con.type = '" + type + "'";
		if(null != code) {
			sql += " and a.con.code = " + code;
		}
		return getPageByQuery(sql, page);
	}

}
