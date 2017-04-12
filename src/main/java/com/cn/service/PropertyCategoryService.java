package com.cn.service;

import java.util.List;

import com.cn.entity.PropertyCategory;

public interface PropertyCategoryService {
	
	public void saveOrUpdate(PropertyCategory propertyCategory);
	
	public void deleteByCategoryId(Integer categoryId);
	
	public List<PropertyCategory> getListByCategoryId(Integer categoryId);

}