package com.cn.service;

import java.util.List;
import java.util.Map;

import com.cn.entity.Category;
import com.cn.vo.CategoryVO;
import com.cn.vo.Page;

public interface CategoryService {

	public Page getPageByParam(int pageSize, int currentPage, String name, String type, Integer code, String isValid);
	
	public Map<String, Object> saveOrUpdate(Map<String, Object> map, CategoryVO categoryVO, int created_by);
	
	public void deleteById(Integer categoryId);
	
	public List<Map<String, Object>> getListByTypeCode(String type, Integer code);
	
	public Category getById(int id);
	
}