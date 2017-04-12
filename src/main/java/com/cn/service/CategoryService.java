package com.cn.service;

import java.util.Map;

import com.cn.vo.CategoryVO;
import com.cn.vo.Page;

public interface CategoryService {

	public Page getPageByParam(int pageSize, int currentPage, String name, Integer typeId, String isValid);
	
	public Map<String, Object> saveOrUpdate(Map<String, Object> map, CategoryVO categoryVO, int created_by);
	
	public void deleteById(Integer categoryId);
	
}