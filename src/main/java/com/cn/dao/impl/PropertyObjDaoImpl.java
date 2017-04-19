package com.cn.dao.impl;

import org.hibernate.SQLQuery;
import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.PropertyObjDao;
import com.cn.entity.PropertyObj;

@Repository(value = "propertyObjDao")
public class PropertyObjDaoImpl extends BaseDaoImpl<PropertyObj> implements PropertyObjDao {


	public PropertyObjDaoImpl() {
		super(PropertyObj.class);
	}

	@Override
	public int countObj(Integer productId, Integer propertyId, Integer categoryId) {
		String sql = "select count(*) from w_property_obj po";
		String appendSql = "";
		boolean flag = false;
		if(productId != null) {
			appendSql += " po.obj_id = " + productId;
			flag = true;
		}
		if(propertyId != null) {
			if(flag) {
				appendSql += " and";
			}
			appendSql += " po.property_id = " + propertyId;
			flag = true;
		}
		if(categoryId != null) {
			if(flag) {
				appendSql += " and";
			}
			appendSql += " po.category_id = " + categoryId;
			flag = true;
		}
		if(flag) {
			sql += " where" + appendSql;
		}
		return Integer.parseInt(((SQLQuery) setParameter(getSession().createSQLQuery(sql))).uniqueResult() + "");
		
	}
	
	@Override
	public void deleteByProductId(Integer productId) {
		String sql = "delete from w_property_obj where obj_id = ?";
		sqlUpdate(sql, productId);
	}
	
	public void save(int created_by, Integer productId, Integer categoryId, Integer propertyId, String value) {
		String sql = "insert into w_property_obj(obj_id, category_id, property_id, value, created_by, updated_by, create_date, update_date)"
					+ " values(?, ?, ?, ?, ?, ?, now(), now())";
		sqlUpdate(sql, productId, categoryId, propertyId, value, created_by, created_by);
	}

}