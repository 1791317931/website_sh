package com.cn.dao.impl;

import java.util.List;

import org.hibernate.SQLQuery;
import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.PropertyObjDao;
import com.cn.entity.PropertyObj;
import com.cn.enums.PropertyConst;

@Repository(value = "propertyObjDao")
public class PropertyObjDaoImpl extends BaseDaoImpl<PropertyObj> implements PropertyObjDao {


	public PropertyObjDaoImpl() {
		super(PropertyObj.class);
	}

	@Override
	public int countObj(Integer productId, Integer propertyId, Integer categoryId) {
		String sql = "select count(*) from w_property_obj po where 1 = 1";
		if(productId != null) {
			sql += " and po.obj_id = " + productId;
		}
		if(propertyId != null) {
			sql += " and po.property_id = " + propertyId;
		}
		if(categoryId != null) {
			sql += " and po.category_id = " + categoryId;
		}
		return Integer.parseInt(((SQLQuery) setParameter(getSession().createSQLQuery(sql))).uniqueResult() + "");
		
	}
	
	@Override
	public void deleteByObjIdAndCategoryId(Integer objId, int categoryId) {
		String sql = "delete from w_property_obj where obj_id = ? and category_id = ?";
		sqlUpdate(sql, objId, categoryId);
	}
	
	public void save(int created_by, Integer productId, Integer categoryId, Integer propertyId, String value) {
		String sql = "insert into w_property_obj(obj_id, category_id, property_id, value, created_by, updated_by, create_date, update_date)"
					+ " values(?, ?, ?, ?, ?, ?, now(), now())";
		sqlUpdate(sql, productId, categoryId, propertyId, value, created_by, created_by);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> getListByObjIdAndCode(Integer objId, Integer code) {
		String sql = "select wp.id, wp.name, wpo.value, wp.is_must"
					+ " from w_property wp"
					+ " left join w_property_obj wpo on wp.id = wpo.property_id"
					+ " left join w_const wc on wc.type = '" + PropertyConst.TYPE + "'"
					+ " where wpo.obj_id = ?"
					+ " and wc.code = ?";
		return getSession().createSQLQuery(sql).setParameter(0, objId).setParameter(1, code).list();
	}

}