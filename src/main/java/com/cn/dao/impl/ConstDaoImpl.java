package com.cn.dao.impl;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.ConstDao;
import com.cn.entity.Const;
import com.cn.enums.ProductCategoryConst;
import com.cn.vo.Page;

@Repository(value = "constDao")
public class ConstDaoImpl extends BaseDaoImpl<Const> implements ConstDao {


	public ConstDaoImpl() {
		super(Const.class);
	}

	@Override
	public Page getPageByType(Page page, String type) {
		String sql = "from Const c where c.type = ?";
		return getPageByQuery(sql, page, type);
	}
	
	public List<Const> getByTypeAndCode(String type, Integer code, String value) {
		String sql = "from Const c where c.type = ? ";
		if (code != null) {
			sql += " and c.code = '" + code + "'";
		}
		if (StringUtils.isNotBlank(value)) {
			sql += " and c.value = '" + value + "'";
		}
		return getListByQuery(sql, type);
	}
	
	@Override
	public List<Const> getByType(String type, Integer code, String value) {
		String sql = "from Const c where c.type = ? and ( 1 = 1";
		if (code != null) {
			sql += " or c.code = '" + code + "'";
		}
		if (StringUtils.isNotBlank(value)) {
			sql += " or c.value = '" + value + "'";
		}
		sql += ")";
		return getListByQuery(sql, type);
	}
	
	@SuppressWarnings("unchecked")
	public List<Integer> getIdsByTypeId(int typeId) {
		String sql = "select wp.id"
				+ " from w_product wp"
				+ " left join w_const_obj wco on wp.id = wco.obj_id"
				+ " left join w_const wc on wco.type_id = wc.id"
				+ " where wc.type = '" + ProductCategoryConst.TYPE + "'"
				+ " and wc.id = " + typeId;
		return getSession().createSQLQuery(sql).list();
	}
	
	public int countByTypeId(int typeId) {
		String sql = "select wco.id"
				+ " from w_const_obj wco"
				+ " left join w_const wc on wco.type_id = wc.id"
				+ " where wc.type = '" + ProductCategoryConst.TYPE + "'"
				+ " and wc.id = " + typeId;
		return getSession().createSQLQuery(sql).list().size();
	}

}