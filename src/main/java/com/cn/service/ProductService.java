package com.cn.service;

import com.cn.vo.Page;
import com.cn.vo.ProductVO;

public interface ProductService {

	public Page getPageByParam(int pageSize, int currentPage, String name, String code);
	
	public void saveOrUpdate(ProductVO productVO, int created_by);
	
}