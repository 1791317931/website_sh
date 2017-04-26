package com.cn.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.base.BaseController;
import com.cn.entity.Category;
import com.cn.entity.Product;
import com.cn.enums.FileConst;
import com.cn.enums.PropertyConst;
import com.cn.service.AttachmentObjService;
import com.cn.service.ProductService;
import com.cn.service.PropertyObjService;
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
	public Map<String, Object> getPage(int pageSize, int currentPage, String name, String code) {
		Page page = productService.getSimplePageByParam(pageSize, currentPage, name, code);
		
		return getMap(page);
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
		productService.saveOrUpdate(productVO, created_by);
		
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
		vo.setSpecialPrice(product.getSpecial_price());
		vo.setStatus(product.getStatus());
		String urls[] = imgUrls.toArray(new String[imgUrls.size()]);
		vo.setImgUrls(urls);
		vo.setPropertyObjs(propertyObjVOs);
		return vo;
	}
	
}