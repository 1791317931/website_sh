package com.cn.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.PropertyCategoryDao;
import com.cn.entity.PropertyCategory;

@Repository(value = "propertyCategoryDao")
public class PropertyCategoryDaoImpl extends BaseDaoImpl<PropertyCategory> implements PropertyCategoryDao {

	public PropertyCategoryDaoImpl() {
		super(PropertyCategory.class);
	}

	@Override
	public void deleteByCategoryId(Integer categoryId) {
		String sql = "delete from w_property_category where category_id = ?";
		sqlUpdate(sql, categoryId);
	}
	
	@Override
	public List<PropertyCategory> getListByCategoryId(Integer categoryId) {
		String sql = "from PropertyCategory pc where pc.category.id = ?";
		return getListByQuery(sql, categoryId);
	}
	
}