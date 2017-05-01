package com.cn.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.ProductDao;
import com.cn.entity.Product;
import com.cn.enums.FileConst;
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
	
	/**
	 * 获取的商品都是带product_category
	 */
	public List<Product> getListByIds(List<Integer> ids) {
		if (ids == null || ids.size() == 0) {
			return new ArrayList<Product>();
		}
		String sql = "from Product p"
					+ " where p.id in (";
		for (int i = 0, length = ids.size(); i < length; i++) {
			int id = ids.get(i);
			if (i == 0) {
				sql += id;
			} else {
				sql += ", " + id;
			}
		}
		sql += ")";
		return getListByQuery(sql);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> getListByTypeId(int typeId) {
		String sql = "select wp.id, wp.name,"
					+ " wp.count, wp.price, ifnull(wco.sort, 0), wa.path"
					+ " from w_product wp"
					+ " left join w_const_obj wco on wp.id = wco.obj_id"
					+ " left join w_const wc on wco.type_id = wc.id"
					+ " left join w_attachment_obj wao on wp.id = wao.obj_id"
					+ " left join w_attachment wa on wao.attachment_id = wa.id"
					+ " left join w_const wc1 on wa.type_id = wc1.id"
					+ " where wc.id = " + typeId
					+ " and wc1.type = '" + FileConst.TYPE + "' and wc1.code = " + FileConst.PRODUCT
					+ " group by wp.id"
					+ " order by wco.sort";
		return getSession().createSQLQuery(sql).list();
	}

}