package com.cn.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.ShopCarDao;
import com.cn.entity.ShopCar;
import com.cn.service.ShopCarService;
import com.cn.vo.ShopCarVO;

@Service(value = "shopCarService")
public class ShopCarServiceImpl implements ShopCarService {
	
	@Resource(name = "shopCarDao")
	private ShopCarDao shopCarDao;
	
	@Override
	public void add(ShopCar shopCar, int userId) {
		int productId = shopCar.getProduct_id();
		List<ShopCar> oldShopCars = shopCarDao.getByProductIdAndUserId(productId, userId);
		Date now = new Date();
		
		if (oldShopCars.size() > 0) {
			// 更新数量即可
			ShopCar sc = oldShopCars.get(0);
			sc.setCount(shopCar.getCount() + sc.getCount());
			sc.setUpdate_date(now);
			shopCarDao.save(sc);
		} else {
			shopCar.setCreate_date(now);
			shopCar.setUpdate_date(now);
			shopCar.setUser_id(userId);
			shopCar.setCreated_by(userId);
			shopCar.setUpdated_by(userId);
			shopCarDao.save(shopCar);
		}
	}

	@Override
	public void batchSave(List<ShopCar> list, int userId) {
		// 先删除原有的商品
		shopCarDao.deleteByUserId(userId);
		if (list != null && list.size() > 0) {
			Date now = new Date();
			for (int i = 0, length = list.size(); i < length; i++) {
				ShopCar shopCar = list.get(i);
				shopCar.setCreate_date(now);
				shopCar.setUpdate_date(now);
				shopCar.setCreated_by(userId);
				shopCar.setUpdated_by(userId);
				shopCar.setUser_id(userId);
				shopCarDao.save(shopCar);
			}
		}
	}

	@Override
	public void batchDelete(List<Integer> ids) {
		shopCarDao.deleteByIds(ids);
	}
	
	@Override
	public List<ShopCarVO> getListByUserId(int userId) {
		List<Object[]> list = shopCarDao.getListByUserId(userId);
		return transformTo(list);
	}
	
	public static List<ShopCarVO> transformTo(List<Object[]> list) {
		List<ShopCarVO> vos =  new ArrayList<ShopCarVO>();
		
		for (int i = 0, length = list.size(); i < length; i++) {
			Object[] objs = list.get(i);
			ShopCarVO vo = new ShopCarVO();
			vo.setId(Integer.parseInt(objs[0] + ""));
			vo.setProductId(Integer.parseInt(objs[1] + ""));
			vo.setName(objs[2] + "");
			if (objs[3] != null) {
				vo.setDescription(objs[3] + "");
			}
			vo.setCount(Integer.parseInt(objs[4] + ""));
			vo.setPrice(Double.parseDouble(objs[5] + ""));
			vos.add(vo);
		}
		
		return vos;
	}

}