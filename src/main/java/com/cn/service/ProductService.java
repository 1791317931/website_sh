package com.cn.service;

import com.cn.entity.Product;
import com.cn.vo.Page;
import com.cn.vo.ProductVO;

public interface ProductService {

	public Page getSimplePageByParam(int pageSize, int currentPage, String name, String code);
	
	public Product getDetail(int id);
	
	public void saveOrUpdate(ProductVO productVO, int created_by);
	
}