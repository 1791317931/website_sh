package com.cn.service;

import java.util.List;

import com.cn.entity.ShopCar;
import com.cn.vo.ShopCarVO;

public interface ShopCarService {

	public void add(ShopCar shopCar, int userId);
	
	public void batchSave(List<ShopCar> list, int userId);
	
	public void batchDelete(List<Integer> ids);
	
	public List<ShopCarVO> getListByUserId(int userId);
	
}