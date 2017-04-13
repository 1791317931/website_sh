package com.cn.service;

import com.cn.vo.Page;

public interface ProductService {

	public Page getPageByParam(int pageSize, int currentPage, String name, String code);
	
}