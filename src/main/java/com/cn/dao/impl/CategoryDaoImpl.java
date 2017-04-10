package com.cn.dao.impl;

import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.CategoryDao;
import com.cn.entity.Category;
import com.cn.vo.Page;

@Repository(value = "categoryDao")
public class CategoryDaoImpl extends BaseDaoImpl<Category> implements CategoryDao {

	public CategoryDaoImpl() {
		super(Category.class);
	}

	@Override
	public Page getPageByParam(Page page, String name, Integer typeId, String isValid) {
		String sql = "from Category c where c.name like '%" + name + "%'";
		if(typeId != null) {
			sql += " and c.con.type_id = " + typeId;
		}
		if(isValid != null) {
			sql += " and c.is_valid = '" + isValid + "'";
		}
		return getPageByQuery(sql, page);
	}

}