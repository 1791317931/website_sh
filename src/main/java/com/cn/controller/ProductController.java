package com.cn.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.base.BaseController;
import com.cn.entity.Category;
import com.cn.entity.Product;
import com.cn.enums.FileConst;
import com.cn.enums.PropertyConst;
import com.cn.service.AttachmentObjService;
import com.cn.service.ConstObjService;
import com.cn.service.ProductService;
import com.cn.service.PropertyObjService;
import com.cn.vo.ConstObjVO;
import com.cn.vo.Page;
import com.cn.vo.ProductVO;
import com.cn.vo.PropertyObjVO;

@Controller
@RequestMapping(value = "/product")
public class ProductController extends BaseController {
	
	@Resource(name = "productService")
	private ProductService productService;
	
	@Resource(name = "attachmentObjService")
	private AttachmentObjService attachmentObjService;

	@Resource(name = "propertyObjService")
	private PropertyObjService propertyObjService;
	
	@Resource(name = "constObjService")
	private ConstObjService constObjService;

	@RequestMapping(value = "/admin/index")
	public String index() {
		return "admin/products/index";
	}
	
	@RequestMapping(value = "/admin/toEdit")
	public String toEdit(ModelMap map, Integer id) {
		map.put("id", id);
		return "admin/products/edit";
	}
	
	@RequestMapping(value = "/user/detail")
	public String toDetail(Integer id, ModelMap map) {
		map.put("id", id);
		return "user/products/detail";
	}
	
	// 搜索页
	@RequestMapping(value = "/search")
	public String toSearch(@RequestParam(defaultValue = "") String name, ModelMap map) {
		map.put("name", name);
		return "user/products/search";
	}
	
	/**
	 * 商品首页配置
	 * @return
	 */
	@RequestMapping(value = "/admin/productCategory")
	public String productCategoryIndex() {
		return "admin/products/product-category-list";
	}
	
	@RequestMapping(value = "/page/simple")
	@ResponseBody
	public Map<String, Object> getPage(int pageSize, int currentPage,
			String name, String code, String valid) {
		Page page = productService.getSimplePageByParam(pageSize, currentPage, name, code, valid);
		
		return getMap(page);
	}
	
	/**
	 * 通过typeId或ids获取商品
	 * @param typeId
	 * @param ids
	 * @return
	 */
	@RequestMapping(value = "/list/byParam")
	@ResponseBody
	public Map<String, Object> getListByTypeId(Integer typeId, 
			@RequestParam(required = false, value = "ids[]") Integer ids[]) {
		if (typeId == null || ids != null) {
			if (ids == null) {
				ids = new Integer[0];
			}
			return getMap(productService.getListByIds(Arrays.asList(ids)));
		} else {
			return getMap(productService.getListByTypeId(typeId));
		}
	}
	
	/**
	 * 获取商品详情
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/detail")
	@ResponseBody
	public Map<String, Object> getProductById(Integer id) {
		Product product = productService.getDetail(id);
		List<String> imgUrls = attachmentObjService.getUrlsByObjIdAndCode(id, FileConst.PRODUCT, null);
		List<PropertyObjVO> objVOs = propertyObjService.getListByObjIdAndCode(id, PropertyConst.PRODUCT);
		
		ProductVO vo = transform(product, imgUrls, objVOs);
		
		return getMap(vo);
	}
	
	@RequestMapping(value = "/saveOrUpdate", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveOrUpdate(@RequestBody ProductVO productVO) {
		productService.saveOrUpdate(productVO, getUserId());
		
		return getMap(null);
	}
	
	// 保存商品列表 const--type-->product_category
	@RequestMapping(value = "/saveOrUpdate/byTypeId/{typeId}", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveOrUpdateByTypeId(@RequestBody List<ConstObjVO> vos,
			@PathVariable(value = "typeId") int typeId) {
		constObjService.batchSave(typeId, vos, getUserId());
		
		return getMap(null);
	}
	
	/**
	 * 删除商品，暂时不校验
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> delete(int id) {
		productService.deleteById(id);
		
		return getMap(null);
	}
	
	public static ProductVO transform(Product product, List<String> imgUrls, List<PropertyObjVO> propertyObjVOs) {
		ProductVO vo = new ProductVO();
		Category category = product.getCategory();
		vo.setCategoryId(category.getId());
		vo.setCategoryName(category.getName());
		vo.setCode(product.getCode());
		vo.setCreate_date(product.getCreate_date());
		vo.setCreated_by(product.getCreated_by());
		vo.setUpdate_date(product.getUpdate_date());
		vo.setUpdated_by(product.getUpdated_by());
		vo.setId(product.getId());
		vo.setIsValid(product.getIs_valid());
		vo.setName(product.getName());
		vo.setPrice(product.getPrice());
		vo.setDescription(product.getDescription());
		vo.setSpecialPrice(product.getSpecial_price());
		vo.setStatus(product.getStatus());
		String urls[] = imgUrls.toArray(new String[imgUrls.size()]);
		vo.setImgUrls(urls);
		vo.setPropertyObjs(propertyObjVOs);
		return vo;
	}
	
}