package com.cn.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.AttachmentObjDao;
import com.cn.entity.AttachmentObj;

@Repository(value = "attachmentObjDao")
public class AttachmentObjDaoImpl extends BaseDaoImpl<AttachmentObj> implements
		AttachmentObjDao {

	public AttachmentObjDaoImpl() {
		super(AttachmentObj.class);
	}

	@Override
	public void deleteByObjId(Integer typeId, Integer objId) {
		String sql = "delete from w_attachment_obj where type_id = ? and obj_id = ?";
		sqlUpdate(sql, typeId, objId);
	}
	
	@Override
	public void save(Integer attachmentId, Integer objId, Integer typeId, int created_by) {
		String sql = "insert into w_attachment_obj(attachment_id, obj_id, type_id, created_by, updated_by, create_date, update_date)"
					+ " values(?, ?, ?, ?, now(), now())";
		sqlUpdate(sql, attachmentId, objId, typeId, created_by, created_by);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<String> getUrlsByObjIdAndCode(Integer objId, Integer code) {
		String sql = "select wa.path"
					+ " from w_attachment wa"
					+ " left join w_attachment_obj wao on wao.attachment_id = wa.id"
					+ " left join w_const wc on wao.type_id = wc.id and wc.type = 'file'"
					+ " where wao.obj_id = ?"
					+ " and wc.code = ?";
		return getSession().createSQLQuery(sql).setParameter(0, objId).setParameter(1, code).list();
	}

}