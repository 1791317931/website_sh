package com.cn.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.base.BaseController;
import com.cn.entity.Const;
import com.cn.service.ConstService;

@Controller
@RequestMapping(value = "/const")
public class ConstController extends BaseController {
	
	@Resource(name = "constService")
	private ConstService constService;

	@RequestMapping(value = "/role")
	public String roleIndex() {
		return "admin/consts/role";
	}
	
	@RequestMapping(value = "/supply")
	public String supply() {
		return "admin/consts/supply";
	}

	@RequestMapping(value = "/product/category")
	public String productCategoryIndex() {
		return "admin/consts/product-category";
	}
	
	@RequestMapping(value = "/page")
	@ResponseBody
	public Map<String, Object> getPage(int pageSize, int currentPage, String type) {
		return getMap(constService.getPageByType(pageSize, currentPage, type));
	}
	
	@RequestMapping(value = "/list")
	@ResponseBody
	public Map<String, Object> getList(String type) {
		return getMap(constService.getByTypeAndCode(type, null, null));
	}
	
	@RequestMapping(value = "/get")
	@ResponseBody
	public Map<String, Object> getConstByParam(String type, Integer code) {
		List<Const> list = constService.getByTypeAndCode(type, code, null);
		return getMap(list.get(0));
	}
	
	@RequestMapping(value = "/delete")
	@ResponseBody
	public Map<String, Object> deleteById(int id) {
		Map<String, Object> result = constService.deleteById(id);
		
		return getMap(result);
	}
	
	@RequestMapping(value = "/saveOrUpdate")
	@ResponseBody
	public Map<String, Object> saveOrUpdate(Const con) {
		Map<String, Object> result = constService.saveOrUpdate(con, getUserId());
		
		return getMap(result);
	}
	
}