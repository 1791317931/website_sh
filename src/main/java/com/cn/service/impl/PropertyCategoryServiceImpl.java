package com.cn.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.PropertyCategoryDao;
import com.cn.entity.PropertyCategory;
import com.cn.service.PropertyCategoryService;

@Service(value = "propertyCategoryService")
public class PropertyCategoryServiceImpl implements PropertyCategoryService {
	
	@Resource(name = "propertyCategoryDao")
	private PropertyCategoryDao propertyCategoryDao;
	
	@Override
	public void saveOrUpdate(PropertyCategory propertyCategory) {
		propertyCategoryDao.save(propertyCategory);
	}
	
	@Override
	public void deleteByCategoryId(Integer categoryId) {
		propertyCategoryDao.deleteByCategoryId(categoryId);
	}

}