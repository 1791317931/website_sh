package com.cn.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.CategoryDao;
import com.cn.service.CategoryService;
import com.cn.vo.Page;

@Service(value = "categoryService")
public class CategoryServiceImpl implements CategoryService {

	@Resource(name = "categoryDao")
	private CategoryDao categoryDao;
	
	@Override
	public Page getPageByParam(int pageSize, int currentPage, String name,
			Integer typeId, String isValid) {
		Page page = new Page(pageSize, currentPage);
		
		return categoryDao.getPageByParam(page, name, typeId, isValid);
	}

}