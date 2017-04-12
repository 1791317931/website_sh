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
	public int countProduct(Integer productId, Integer propertyId, Integer categoryId) {
		String sql = "select count(*) from w_property_obj po where";
		boolean flag = false;
		if(productId != null) {
			sql += " po.product_id = " + productId;
			flag = true;
		}
		if(propertyId != null) {
			if(flag) {
				sql += " and";
			}
			sql += " po.property_id = " + propertyId;
			flag = true;
		}
		if(categoryId != null) {
			if(flag) {
				sql += " and";
			}
			sql += " po.category_id = " + categoryId;
			flag = true;
		}
		return Integer.parseInt(((SQLQuery) setParameter(getSession().createSQLQuery(sql))).uniqueResult() + "");
		
	}
	
	@Override
	public void deleteByProductId(Integer productId) {
		String sql = "delete from w_property_obj where product_id = ?";
		sqlUpdate(sql, productId);
	}

}