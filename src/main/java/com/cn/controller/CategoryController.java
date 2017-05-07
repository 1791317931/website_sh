package com.cn.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.base.BaseController;
import com.cn.entity.PropertyCategory;
import com.cn.service.CategoryService;
import com.cn.service.PropertyCategoryService;
import com.cn.service.PropertyObjService;
import com.cn.vo.CategoryVO;
import com.cn.vo.Page;

@Controller
@RequestMapping(value = "/category")
public class CategoryController extends BaseController {

	@Resource(name = "categoryService")
	private CategoryService categoryService;
	
	@Resource(name = "propertyCategoryService")
	private PropertyCategoryService propertyCategoryService;
	
	@Resource(name = "propertyObjService")
	private PropertyObjService propertyObjService;
	
	@RequestMapping(value = "/admin/index")
	public String index() {
		return "admin/categorys/index";
	}
	
	@RequestMapping(value = "/page")
	@ResponseBody
	public Map<String, Object> getPageByParam(int pageSize, int currentPage,
			@RequestParam(defaultValue = "") String name,
			String type, Integer code, String isValid) {
		Page page = categoryService.getPageByParam(pageSize, currentPage, name, type, code, isValid);
		
		return getMap(page);
	}
	
	@RequestMapping(value = "/saveOrUpdate", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveOrUpdate(CategoryVO categoryVO) {
		return categoryService.saveOrUpdate(getMap(null), categoryVO, getUserId());
	}
	
	@RequestMapping(value = "/property/delete", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> deletePropertyCategoryByCategoryId(Integer categoryId) {
		if(propertyObjService.countProperty(null, null, categoryId) > 0) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("success", false);
			map.put("data", "该分类已经被使用，无法删除");
			return map;
		}
		
		propertyCategoryService.deleteByCategoryId(categoryId);
		
		return getMap(null);
	}
	
	@RequestMapping(value = "/property/list")
	@ResponseBody
	public Map<String, Object> getPropertyCategoryByCategoryId(Integer categoryId) {
		List<PropertyCategory> list = propertyCategoryService.getListByCategoryId(categoryId);
		
		return getMap(list);
	}
	
	@RequestMapping(value = "/list")
	@ResponseBody
	public Map<String, Object> getCategoryList(String type, Integer code) {
		List<Map<String, Object>> list = categoryService.getListByTypeCode(type, code);
		
		return getMap(list);
	}
	
}