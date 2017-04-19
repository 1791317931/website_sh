package com.cn.dao;

import java.util.List;

import com.cn.base.BaseDao;
import com.cn.entity.PropertyObj;

public interface PropertyObjDao extends BaseDao<PropertyObj> {

	public int countObj(Integer productId, Integer propertyId, Integer categoryId);
	
	public void deleteByProductId(Integer productId);
	
	public void save(int created_by, Integer productId, Integer categoryId, Integer propertyId, String value);
	
	public List<String> getListByObjIdAndCode(Integer objId, Integer code);
	
}