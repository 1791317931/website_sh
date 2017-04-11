package com.cn.service;

import com.cn.vo.CategoryVO;
import com.cn.vo.Page;

public interface CategoryService {

	public Page getPageByParam(int pageSize, int currentPage, String name, Integer typeId, String isValid);
	
	public void saveOrUpdate(CategoryVO categoryVO, int created_by);
	
}