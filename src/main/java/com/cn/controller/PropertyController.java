package com.cn.controller;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.base.BaseController;
import com.cn.entity.Property;
import com.cn.service.PropertyObjService;
import com.cn.service.PropertyService;
import com.cn.vo.Page;

@Controller
@RequestMapping(value = "/property")
public class PropertyController extends BaseController {

	@Resource(name = "propertyService")
	private PropertyService propertyService;
	
	@Resource(name = "propertyObjService")
	private PropertyObjService propertyObjService;
	
	@RequestMapping(value = "/admin/index")
	public String index() {
		return "admin/properties/index";
	}
	
	/**
	 * 分页查询属性
	 * @param pageSize
	 * @param currentPage
	 * @param typeId	属性分类
	 * @return
	 */
	@RequestMapping(value = "/page")
	@ResponseBody
	public Map<String, Object> getPage(int pageSize, int currentPage, Integer typeId) {
		Page page = propertyService.getPage(pageSize, currentPage, typeId);
		return getMap(page);
	}
	
	@RequestMapping(value = "/saveOrUpdate", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveOrUpdate(Property property, int typeId) {
		propertyService.saveOrUpdate(property, typeId);
		
		return getMap(null);
	}
	
	@RequestMapping(value = "/count")
	@ResponseBody
	public Map<String, Object> countProduct(Integer productId, Integer propertyId, Integer categoryId) {
		int count = propertyObjService.countProperty(productId, propertyId, categoryId);
		
		return getMap(count);
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> deleteById(int propertyId) {
		propertyService.deleteById(propertyId);
		
		return getMap(null);
	}
	
	@RequestMapping(value = "/obj/delete", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> deleteByProductId(int objId, int typeId) {
		propertyObjService.deleteByObjIdAndTypeId(objId, typeId);
		
		return getMap(null);
	}
}