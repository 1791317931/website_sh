package com.cn.controller;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.base.BaseController;
import com.cn.service.ProductService;
import com.cn.vo.Page;
import com.cn.vo.ProductVO;

@Controller
@RequestMapping(value = "/product")
public class ProductController extends BaseController {
	
	@Resource(name = "productService")
	private ProductService productService;

	@RequestMapping(value = "/admin/index")
	public String index() {
		return "admin/products/index";
	}
	
	@RequestMapping(value = "/admin/toEdit")
	public String toEdit(ModelMap map, Integer id) {
		map.put("id", id);
		return "admin/products/edit";
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
	
	@RequestMapping(value = "/page/simple")
	@ResponseBody
	public Map<String, Object> getPage(int pageSize, int currentPage, String name, String code) {
		Page page = productService.getSimplePageByParam(pageSize, currentPage, name, code);
		
		return getMap(page);
	}
	
	@RequestMapping(value = "/saveOrUpdate", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveOrUpdate(@RequestBody ProductVO productVO) {
		productService.saveOrUpdate(productVO, created_by);
		
		return getMap(null);
	}
	
}