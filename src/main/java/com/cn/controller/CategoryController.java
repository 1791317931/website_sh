package com.cn.controller;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.base.BaseController;
import com.cn.service.CategoryService;
import com.cn.vo.Page;

@Controller
@RequestMapping(value = "/category")
public class CategoryController extends BaseController {

	@Resource(name = "categoryService")
	private CategoryService categoryService;
	
	@RequestMapping(value = "/admin/index")
	public String index() {
		return "admin/categorys/index";
	}
	
	@RequestMapping(value = "/page")
	@ResponseBody
	public Map<String, Object> getPageByParam(int pageSize, int currentPage,
			@RequestParam(defaultValue = "") String name,
			Integer typeId, String isValid) {
		Page page = categoryService.getPageByParam(pageSize, currentPage, name, typeId, isValid);
		
		return getMap(page);
	}
	
}