package com.cn.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.CategoryDao;
import com.cn.dao.PropertyDao;
import com.cn.entity.Category;
import com.cn.entity.Const;
import com.cn.entity.Property;
import com.cn.entity.PropertyCategory;
import com.cn.service.CategoryService;
import com.cn.service.ConstService;
import com.cn.service.PropertyCategoryService;
import com.cn.service.PropertyObjService;
import com.cn.vo.CategoryVO;
import com.cn.vo.Page;

@Service(value = "categoryService")
public class CategoryServiceImpl implements CategoryService {

	@Resource(name = "categoryDao")
	private CategoryDao categoryDao;
	
	@Resource(name = "propertyDao")
	private PropertyDao propertyDao;
	
	@Resource(name = "constService")
	private ConstService constService;
	
	@Resource(name = "propertyCategoryService")
	private PropertyCategoryService propertyCategoryService;
	
	@Resource(name = "propertyObjService")
	private PropertyObjService propertyObjService;
	
	@Override
	public Page getPageByParam(int pageSize, int currentPage, String name,
			String type, Integer code, String isValid) {
		Page page = new Page(pageSize, currentPage);
		Integer typeId = null;
		if (type != null && type.length() > 0) {
			List<Const> list = constService.getByTypeAndCode(type, code);
			Const con = list.get(0);
			typeId = con.getId();
		}
		
		return categoryDao.getPageByParam(page, name, typeId, isValid);
	}
	
	@Override
	public Map<String, Object> saveOrUpdate(Map<String, Object> map, CategoryVO categoryVO, int created_by) {
		Category category = null;
		Integer categoryId = categoryVO.getId();
		
		// 如果categoryId不为空，需要判断该分类已被使用
		if(propertyObjService.countProperty(null, null, categoryId) > 0) {
			map.put("success", false);
			map.put("data", "该分类已经被使用，无法修改");
			return map;
		}
		
		Date now = new Date();
		Const con = constService.getById(categoryVO.getTypeId());
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
		
		return map;
	}
	
	@Override
	public void deleteById(Integer categoryId) {
		categoryDao.deleteById(categoryId);
	}
	
	@Override
	public List<Map<String, Object>> getListByTypeCode(String type, Integer code) {
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List<Object[]> categorys = categoryDao.getListByTypeCode(type, code);
		for(int i = 0, length = categorys.size(); i < length; i++) {
			Object[] objs = categorys.get(i);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", objs[0]);
			map.put("name", objs[1]);
			list.add(map);
		}
		return list;
	}
	
	@Override
	public Category getById(int id) {
		return categoryDao.get(id);
	}

}