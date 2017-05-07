package com.cn.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.base.BaseController;
import com.cn.entity.ShopCar;
import com.cn.service.ProductService;
import com.cn.service.ShopCarService;
import com.cn.vo.ShopCarVO;

@Controller
@RequestMapping(value = "/shopcar")
public class ShopCarController extends BaseController {

	@Resource(name = "productService")
	private ProductService productService;
	
	@Resource(name = "shopCarService")
	private ShopCarService shopCarService;

	@RequestMapping(value = "/index")
	public String toShopCar() {
		return "user/products/shop_car";
	}
	
	// 新增购物车
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> add(ShopCar shopCar) {
		shopCarService.add(shopCar, getUserId());
		return getMap(null);
	}
	
	// 通过id删除购物车
	@RequestMapping(value = "/delete/byIds", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> deleteByIds(List<Integer> ids) {
		shopCarService.batchDelete(ids);
		return getMap(null);
	}
	
	// 批量保存购物车
	@RequestMapping(value = "/batchSave", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> batchSave(List<ShopCar> list) {
		shopCarService.batchSave(list, getUserId());
		return getMap(null);
	}
	
	// 获取用户购物车信息
	@RequestMapping(value = "/list/byUserId")
	@ResponseBody
	public Map<String, Object> getListByUserId() {
		List<ShopCarVO> list = shopCarService.getListByUserId(getUserId());
		return getMap(list);
	}
	
}