package com.cn.dao.impl;

import java.util.ArrayList;
import java.util.List;

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
	public Page getSimplePageByParam(Page page, String name, String code, String valid) {
		String sql = "from Product wp where 1 = 1";
		if (name != null && name.length() > 0) {
			sql += " and wp.name like '%" + name + "%'";
		}
		if (code != null && code.length() > 0) {
			sql += " and wp.code like '%" + code + "%'";
		}
		if (valid != null) {
			sql += " and wp.is_valid = '" + valid + "'";
		}
		return getPageByQuery(sql, page);
	}
	
	public List<Product> getListByIds(List<Integer> ids) {
		if (ids == null || ids.size() == 0) {
			return new ArrayList<Product>();
		}
		String sql = "from Product wp where wp.id in (";
		for (int i = 0, length = ids.size(); i < length; i++) {
			int id = ids.get(i);
			if (i == 0) {
				sql += id;
			} else {
				sql += ", " + id;
			}
		}
		sql += ") order by wp.update_date desc";
		return getListByQuery(sql);
	}

}