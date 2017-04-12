package com.cn.dao;

import com.cn.base.BaseDao;
import com.cn.entity.Category;
import com.cn.vo.Page;

public interface CategoryDao extends BaseDao<Category> {

	public Page getPageByParam(Page page, String name, Integer typeId, String isValid);
	
	public void deleteById(Integer categoryId);
	
}