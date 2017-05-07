package com.cn.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.ShopCarDao;
import com.cn.entity.ShopCar;

@Repository(value = "shopCarDao")
public class ShopCarDaoImpl extends BaseDaoImpl<ShopCar> implements ShopCarDao {

	public ShopCarDaoImpl() {
		super(ShopCar.class);
	}
	
	@Override
	public List<ShopCar> getByProductIdAndUserId(int productId, int userId) {
		String sql = "from ShopCar sc where sc.product_id = " + productId + " and sc.user_id = " + userId;
		return getListByQuery(sql);
	}
	
	@Override
	public void deleteByUserId(int userId) {
		String sql = "delete from w_shopcar where user_id = " + userId;
		sqlUpdate(sql);
	}
	
	@Override
	public void deleteByIds(List<Integer> ids) {
		if (ids == null || ids.size() == 0) {
			return;
		}
		String sql = "delete from w_shopcar where id in (";
		for (int i = 0, length = ids.size(); i < length; i++) {
			if (i != 0) {
				sql += ", ";
			}
			sql += ids.get(i);
		}
		sql += ")";
		sqlUpdate(sql);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> getListByUserId(int userId) {
		String sql = "select ws.id, ws.product_id, wp.name, wp.description, ws.count, wp.price"
					+ " from w_shopcar ws"
					+ " left join w_product wp on ws.product_id = wp.id"
					+ " left join w_user wu on ws.user_id = wu.id"
					+ " where wu.id = " + userId
					+ " order by ws.id asc";
		return getSession().createSQLQuery(sql).list();
	}

}