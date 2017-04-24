package com.cn.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.base.BaseController;
import com.cn.entity.Material;
import com.cn.enums.FileConst;
import com.cn.enums.PropertyConst;
import com.cn.service.MaterialService;
import com.cn.vo.Page;
import com.cn.vo.MaterialVO;
import com.cn.vo.PropertyObjVO;

@Controller
@RequestMapping(value = "/material")
public class MaterialController extends BaseController {

	@Resource(name = "materialService")
	private MaterialService materialService;

	@RequestMapping(value = "/admin/index")
	public String index() {
		return "admin/materials/material";
	}
	
	@RequestMapping(value = "/admin/toEdit")
	public String toEdit(ModelMap map, Integer id) {
		map.put("id", id);
		return "admin/materials/edit";
	}
	
	@RequestMapping(value = "/page/simple")
	@ResponseBody
	public Map<String, Object> getSimplePage(
			@RequestParam(defaultValue = "10") int pageSize,
			@RequestParam(defaultValue = "1") int currentPage,
			@RequestParam(defaultValue = "") String name,
			@RequestParam(defaultValue = "") String code) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("name", name);
		map.put("code", code);
		Page page = materialService.getSimplePageByParam(pageSize, currentPage, map);
		
		return getMap(page);
	}
	
	/**
	 * 获取商品详情
	 * @param id
	 * @return
	 */
	/*@RequestMapping(value = "/detail")
	@ResponseBody
	public Map<String, Object> getMaterialById(Integer id) {
		Material Material = MaterialService.getDetail(id);
		List<String> imgUrls = attachmentObjService.getUrlsByObjIdAndCode(id, FileConst.Material, null);
		List<PropertyObjVO> objVOs = propertyObjService.getListByObjIdAndCode(id, PropertyConst.Material);
		
		MaterialVO vo = transform(Material, imgUrls, objVOs);
		
		return getMap(vo);
	}*/
	
	@RequestMapping(value = "/saveOrUpdate", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveOrUpdate(@RequestBody MaterialVO MaterialVO) {
//		MaterialService.saveOrUpdate(MaterialVO, created_by);
		
		return getMap(null);
	}
	
}