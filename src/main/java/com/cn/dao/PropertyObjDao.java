package com.cn.dao;

import com.cn.base.BaseDao;
import com.cn.entity.PropertyObj;

public interface PropertyObjDao extends BaseDao<PropertyObj> {

	public int countProductByPropertyId(int propertyId);
	
}