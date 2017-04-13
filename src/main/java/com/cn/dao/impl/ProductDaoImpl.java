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
	public Page getPageByParam(Page page, String name, String code) {
		String sql = "from Product wp";
		boolean flag = false;
		if(name != null && name.length() > 0) {
			sql += " where wp.name like '%" + name + "%'";
			flag = true;
		}
		if(code != null && code.length() > 0) {
			if(flag) {
				sql += " and";
			}
			sql += " where wp.code like '%" + code + "%'";
		}
		return getPageByQuery(sql, page);
	}

}