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
	public int countProductByPropertyId(int propertyId) {
		String sql = "select count(*) from w_property_obj po where po.property_id = ?";
		return Integer.parseInt(((SQLQuery) setParameter(getSession().createSQLQuery(sql), propertyId)).uniqueResult() + "");
	}

}