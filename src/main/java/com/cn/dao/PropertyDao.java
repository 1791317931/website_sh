package com.cn.dao;

import com.cn.base.BaseDao;
import com.cn.entity.Property;
import com.cn.vo.Page;

public interface PropertyDao extends BaseDao<Property> {

	public Page getPage(Page page, Integer typeId);
	
	public void updateBySql(Property property);
	
	public void deleteById(int id);
	
}