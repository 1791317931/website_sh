package com.cn.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.AttachmentObjDao;
import com.cn.entity.AttachmentObj;
import com.cn.enums.FileConst;
import com.cn.vo.Page;

@Repository(value = "attachmentObjDao")
public class AttachmentObjDaoImpl extends BaseDaoImpl<AttachmentObj> implements
		AttachmentObjDao {

	public AttachmentObjDaoImpl() {
		super(AttachmentObj.class);
	}

	@Override
	public void deleteByParam(Integer typeId, Integer objId) {
		String sql = "delete from w_attachment_obj";
		boolean flag = false;
		if (typeId != null) {
			sql += " where type_id = " + typeId;
			flag = true;
		}
		if (objId != null) {
			if (flag) {
				sql += " and obj_id = " + objId;
			} else {
				sql += " where obj_id = " + objId;
			}
		}
		sqlUpdate(sql);
	}
	
	@Override
	public void deleteByAttachmentId(int attachmentId) {
		String sql = "delete from w_attachment_obj where attachment_id = " + attachmentId;
		sqlUpdate(sql);
	}
	
	@Override
	public void save(Integer attachmentId, Integer objId, Integer typeId, int created_by) {
		String sql = "insert into w_attachment_obj(attachment_id, obj_id, type_id, created_by, updated_by, create_date, update_date)"
					+ " values(?, ?, ?, ?, ?, now(), now())";
		sqlUpdate(sql, attachmentId, objId, typeId, created_by, created_by);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<String> getUrlsByObjIdAndCode(Integer objId, Integer code, String orderBy) {
		String sql = "select wa.path"
					+ " from w_attachment wa"
					+ " left join w_attachment_obj wao on wao.attachment_id = wa.id"
					+ " left join w_const wc on wao.type_id = wc.id and wc.type = '" + FileConst.TYPE + "'"
					+ " where wao.obj_id = ?"
					+ " and wc.code = ?";
		if (orderBy != null) {
			sql += " order by " + orderBy + "  asc";
		} else {
			sql += " order by wa.update_date desc";
		}
		return getSession().createSQLQuery(sql).setParameter(0, objId).setParameter(1, code).list();
	}
	
	public Page getPageObjByParam(Page page, String type, Integer code, String orderBy) {
		String sql = "select wa.id, wa.path, wao.obj_id, wao.sort"
					+ " from w_attachment wa"
					+ " left join w_attachment_obj wao on wa.id = wao.attachment_id and wa.type_id = wao.type_id"
					+ " left join w_const wc on wa.type_id = wc.id"
					+ " where wc.type = '" + type + "'"
					+ " and wc.code = " + code;
		if (orderBy != null) {
			sql += " order by " + orderBy + " asc";
		} else {
			sql += " order by wa.update_date desc";
		}
		return getPageObjBySQL(sql, page);
	}
	
	public List<AttachmentObj> getByAttachmentId(int attachmentId) {
		String sql = "from AttachmentObj ao where ao.attachment_id = " + attachmentId;
		return getListByQuery(sql);
	}
	
	@Override
	public int countByTypeAndCode(String type, int code) {
		String sql = "select count(1)"
					+ " from w_attachment_obj wao"
					+ " left join w_const wc on wao.type_id = wc.id"
					+ " where wc.type = '" + type + "'"
					+ " and wc.code = " + code;
		return Integer.parseInt(getSession().createSQLQuery(sql).uniqueResult() + "");
	}
	
	public void updateSortByAttachmentId(int attachmentId, int sort) {
		String sql = "update w_attachment_obj set sort = " + sort + " where attachment_id = " + attachmentId;
		sqlUpdate(sql);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	public void updateStatusByParam(String type, int code, String status) {
		String sql = "update w_attachment_obj set status = ? where type = ? and code = ?";
		sqlUpdate(sql, status, type, code);
	}
	
	public void updateStatus(int attachmentId, String status) {
		String sql = "update w_attachment_obj set status = ? where attachment_id = ?";
		sqlUpdate(sql, status, attachmentId);
	}

}