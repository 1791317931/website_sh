package com.cn.service.impl;

import java.util.Date;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cn.dao.CategoryDao;
import com.cn.dao.ConstDao;
import com.cn.dao.PropertyDao;
import com.cn.entity.Category;
import com.cn.entity.Const;
import com.cn.entity.Property;
import com.cn.entity.PropertyCategory;
import com.cn.service.CategoryService;
import com.cn.service.PropertyCategoryService;
import com.cn.vo.CategoryVO;
import com.cn.vo.Page;

@Service(value = "categoryService")
@Transactional
public class CategoryServiceImpl implements CategoryService {

	@Resource(name = "categoryDao")
	private CategoryDao categoryDao;
	
	@Resource(name = "constDao")
	private ConstDao constDao;
	
	@Resource(name = "propertyDao")
	private PropertyDao propertyDao;
	
	@Resource(name = "propertyCategoryService")
	private PropertyCategoryService propertyCategoryService;
	
	@Override
	public Page getPageByParam(int pageSize, int currentPage, String name,
			Integer typeId, String isValid) {
		Page page = new Page(pageSize, currentPage);
		
		return categoryDao.getPageByParam(page, name, typeId, isValid);
	}
	
	@Override
	public void saveOrUpdate(CategoryVO categoryVO, int created_by) {
		Category category = null;
		Integer categoryId = categoryVO.getId();
		Date now = new Date();
		Const con = constDao.get(categoryVO.getTypeId());
		String name = categoryVO.getName();
		Integer propertyIds[] = categoryVO.getPropertyIds();
		
		if(categoryId == null) {
			category = new Category();
			category.setCon(con);
			category.setCreated_by(created_by);
			category.setUpdated_by(created_by);
			category.setIs_valid("Y");
			category.setName(name);
			category.setCreate_date(now);
			category.setUpdate_date(now);
		} else {
			category = categoryDao.get(categoryId);
			category.setCon(con);
			category.setName(name);
			category.setUpdate_date(now);
			category.setUpdated_by(created_by);
		}
		categoryDao.save(category);
		
		// 删除所有categoryId对应的PropertyCategory
		propertyCategoryService.deleteByCategoryId(categoryId);
		
		for(int i = 0, length = propertyIds.length; i < length; i++) {
			Property property = propertyDao.get(propertyIds[i]);
			PropertyCategory propertyCategory = new PropertyCategory();
			propertyCategory.setCategory(category);
			propertyCategory.setCreate_date(now);
			propertyCategory.setCreated_by(created_by);
			propertyCategory.setProperty(property);
			propertyCategory.setUpdate_date(now);
			propertyCategory.setUpdated_by(created_by);
			propertyCategoryService.saveOrUpdate(propertyCategory);
		}
	}

}