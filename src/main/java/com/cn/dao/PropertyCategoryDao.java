package com.cn.dao;

import java.util.List;

import com.cn.base.BaseDao;
import com.cn.entity.PropertyCategory;

public interface PropertyCategoryDao extends BaseDao<PropertyCategory> {
	
	public void deleteByCategoryId(Integer categoryId);
	
	public List<PropertyCategory> getListByCategoryId(Integer categoryId);

}