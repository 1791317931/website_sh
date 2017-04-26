package com.cn.dao.impl;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
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
	
	public List<Product> getListByTypeId(int typeId, String valid) {
		String sql = "from Product wp where type_id = " + typeId;
		if (StringUtils.isNotBlank(valid)) {
			sql += " and wp.is_valid = '" + valid + "'";
		}
		return getListByQuery(sql);
	}
	
	@Override
	public int countByTypeId(int typeId, String valid) {
		String sql = "select count(1) from w_product wp where type_id = " + typeId;
		if (StringUtils.isNotBlank(valid)) {
			sql += " and wp.is_valid = '" + valid + "'";
		}
		return countBySQL(sql);
	}
	
	@Override
	public void deleteByTypeId(int typeId) {
		String sql = "delete from w_product where type_id = " + typeId;
		sqlUpdate(sql);
	}

}