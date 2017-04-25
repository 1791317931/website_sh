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
import com.cn.entity.Category;
import com.cn.entity.Material;
import com.cn.enums.FileConst;
import com.cn.enums.PropertyConst;
import com.cn.service.AttachmentObjService;
import com.cn.service.MaterialService;
import com.cn.service.PropertyObjService;
import com.cn.vo.Page;
import com.cn.vo.MaterialVO;
import com.cn.vo.PropertyObjVO;

@Controller
@RequestMapping(value = "/material")
public class MaterialController extends BaseController {

	@Resource(name = "materialService")
	private MaterialService materialService;
	
	@Resource(name = "attachmentObjService")
	private AttachmentObjService attachmentObjService;

	@Resource(name = "propertyObjService")
	private PropertyObjService propertyObjService;

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
	
	@RequestMapping(value = "/delete")
	@ResponseBody
	public Map<String, Object> deleteById(int id) {
		materialService.deleteById(id);
		
		return getMap(null);
	}
	
	/**
	 * 获取商品详情
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/detail")
	@ResponseBody
	public Map<String, Object> getMaterialById(Integer id) {
		Material material = materialService.getById(id);
		List<String> imgUrls = attachmentObjService.getUrlsByObjIdAndCode(id, FileConst.MATERIAL, null);
		List<String> attachmentUrls = attachmentObjService.getUrlsByObjIdAndCode(id, FileConst.MATERIAL_ATTACHMENT, null);
		List<PropertyObjVO> objVOs = propertyObjService.getListByObjIdAndCode(id, PropertyConst.MATERIAL);
		
		MaterialVO vo = transform(material, imgUrls, attachmentUrls, objVOs);
		
		return getMap(vo);
	}
	
	@RequestMapping(value = "/saveOrUpdate", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveOrUpdate(@RequestBody MaterialVO MaterialVO) {
		materialService.saveOrUpdate(MaterialVO, created_by);
		
		return getMap(null);
	}
	
	public static MaterialVO transform(Material material, List<String> imgUrls, List<String> attachmentUrls,
			List<PropertyObjVO> propertyObjVOs) {
		MaterialVO vo = new MaterialVO();
		Category category = material.getCategory();
		vo.setCategoryId(category.getId());
		vo.setCategoryName(category.getName());
		vo.setCode(material.getCode());
		vo.setCreate_date(material.getCreate_date());
		vo.setCreated_by(material.getCreated_by());
		vo.setUpdate_date(material.getUpdate_date());
		vo.setUpdated_by(material.getUpdated_by());
		vo.setId(material.getId());
		vo.setIsValid(material.getIs_valid());
		vo.setName(material.getName());
		vo.setPrice(material.getPrice());
		vo.setSpecialPrice(material.getSpecial_price());
		vo.setStatus(material.getStatus());
		String urls[] = imgUrls.toArray(new String[imgUrls.size()]);
		vo.setImgUrls(urls);
		String array[] = attachmentUrls.toArray(new String[attachmentUrls.size()]);
		vo.setAttachmentUrls(array);
		vo.setPropertyObjs(propertyObjVOs);
		return vo;
	}
	
}