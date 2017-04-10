package com.cn.service;

import com.cn.entity.Property;
import com.cn.vo.Page;

public interface PropertyService {

	public Page getPage(int pageSize, int currentPage, Integer typeId);
	
	public void saveOrUpdate(Property property, int typeId);
	
	public Property get(int id);
	
	public void deleteById(int id);
	
}