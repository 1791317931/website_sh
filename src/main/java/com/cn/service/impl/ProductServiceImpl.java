package com.cn.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.ProductDao;
import com.cn.service.ProductService;
import com.cn.vo.Page;

@Service(value = "productService")
public class ProductServiceImpl implements ProductService {
	
	@Resource(name = "productDao")
	private ProductDao productDao;

	@Override
	public Page getPageByParam(int pageSize, int currentPage, String name,
			String code) {
		Page page = new Page(pageSize, currentPage);
		return productDao.getPageByParam(page, name, code);
	}

}