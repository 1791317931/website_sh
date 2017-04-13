package com.cn.dao;

import com.cn.base.BaseDao;
import com.cn.entity.Product;
import com.cn.vo.Page;

public interface ProductDao extends BaseDao<Product> {

	public Page getPageByParam(Page page, String name, String code);
	
}