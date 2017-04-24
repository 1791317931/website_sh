package com.cn.dao.impl;

import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.ProductDao;
import com.cn.entity.Product;
import com.cn.vo.Page;

@Repository(value = "productDao")
public class ProductDaoImpl extends BaseDaoImpl<Product> implements ProductDao {

	public ProductDaoImpl() {
		super(Product.class);
	}
	
	@Override
	public Page getSimplePageByParam(Page page, String name, String code) {
		String sql = "from Product wp where 1 = 1";
		if(name != null && name.length() > 0) {
			sql += " and wp.name like '%" + name + "%'";
		}
		if(code != null && code.length() > 0) {
			sql += " and wp.code like '%" + code + "%'";
		}
		return getPageByQuery(sql, page);
	}

}