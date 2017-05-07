package com.cn.dao;

import java.util.List;

import com.cn.base.BaseDao;
import com.cn.entity.ShopCar;

public interface ShopCarDao extends BaseDao<ShopCar> {

	public List<ShopCar> getByProductIdAndUserId(int productId, int userId);
	
	public void deleteByUserId(int userId);
	
	public void deleteByIds(List<Integer> ids);
	
	public List<Object[]> getListByUserId(int userId);
	
}