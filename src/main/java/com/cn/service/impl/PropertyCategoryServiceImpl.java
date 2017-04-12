package com.cn.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cn.dao.PropertyCategoryDao;
import com.cn.entity.PropertyCategory;
import com.cn.service.CategoryService;
import com.cn.service.PropertyCategoryService;

@Service(value = "propertyCategoryService")
@Transactional
public class PropertyCategoryServiceImpl implements PropertyCategoryService {
	
	@Resource(name = "propertyCategoryDao")
	private PropertyCategoryDao propertyCategoryDao;
	
	@Resource(name = "categoryService")
	private CategoryService categoryService;
	
	@Override
	public void saveOrUpdate(PropertyCategory propertyCategory) {
		propertyCategoryDao.save(propertyCategory);
	}
	
	@Override
	public void deleteByCategoryId(Integer categoryId) {
		propertyCategoryDao.deleteByCategoryId(categoryId);
		categoryService.deleteById(categoryId);
	}
	
	public List<PropertyCategory> getListByCategoryId(Integer categoryId) {
		return propertyCategoryDao.getListByCategoryId(categoryId);
	}

}