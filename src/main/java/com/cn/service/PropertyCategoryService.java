package com.cn.service;

import com.cn.entity.PropertyCategory;

public interface PropertyCategoryService {
	
	public void saveOrUpdate(PropertyCategory propertyCategory);
	
	public void deleteByCategoryId(Integer categoryId);

}