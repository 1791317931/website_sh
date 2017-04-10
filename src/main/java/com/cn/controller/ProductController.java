package com.cn.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/product")
public class ProductController {

	@RequestMapping(value = "/admin/index")
	public String index() {
		return "admin/products/index";
	}
	
	@RequestMapping(value = "/user/index")
	public String toDetail(Integer id, ModelMap map) {
		map.put("id", id);
		return "user/products/index";
	}
	
	@RequestMapping(value = "/user/shopcar")
	public String toShopCar() {
		return "user/products/shop_car";
	}
	
}