package com.cn.service.impl;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.ProductDao;
import com.cn.entity.Attachment;
import com.cn.entity.AttachmentObj;
import com.cn.entity.Category;
import com.cn.entity.Const;
import com.cn.entity.Product;
import com.cn.enums.FileConst;
import com.cn.service.AttachmentObjService;
import com.cn.service.AttachmentService;
import com.cn.service.CategoryService;
import com.cn.service.ConstService;
import com.cn.service.ProductService;
import com.cn.service.PropertyObjService;
import com.cn.vo.Page;
import com.cn.vo.ProductVO;
import com.cn.vo.PropertyObjVO;

@Service(value = "productService")
public class ProductServiceImpl implements ProductService {
	
	@Resource(name = "productDao")
	private ProductDao productDao;
	
	@Resource(name = "propertyObjService")
	private PropertyObjService propertyObjService;
	
	@Resource(name = "categoryService")
	private CategoryService categoryService;
	
	@Resource(name = "attachmentService")
	private AttachmentService attachmentService;
	
	@Resource(name = "attachmentObjService")
	private AttachmentObjService attachmentObjService;
	
	@Resource(name = "constService")
	private ConstService constService;
	
	@Override
	public Page getSimplePageByParam(int pageSize, int currentPage, String name,
			String code) {
		Page page = new Page(pageSize, currentPage);
		return productDao.getSimplePageByParam(page, name, code);
	}
	
	public Product getDetail(int id) {
		return productDao.get(id);
	}
	
	@Override
	public void saveOrUpdate(ProductVO productVO, int created_by) {
		Integer id = productVO.getId();
		Integer categoryId = productVO.getCategoryId();
		Category category = categoryService.getById(categoryId);
		Product product = null;
		if(id == null) {
			product = new Product();
			product.setCode(UUID.randomUUID() + "");
		} else {
			product = productDao.get(id);
		}
		product.setCategory(category);
		product.setCount(productVO.getCount());
		Date now = new Date();
		product.setCreate_date(now);
		product.setUpdate_date(now);
		product.setIs_valid("Y");
		product.setName(productVO.getName());
		product.setPrice(productVO.getPrice());
		product.setSpecial_price(productVO.getSpecialPrice());
		product.setStatus("N");
		product.setCreated_by(created_by);
		product.setUpdated_by(created_by);
		productDao.save(product);
		
		Integer productId = product.getId();
		propertyObjService.deleteByProductId(productId);
		List<PropertyObjVO> propertyObjVOs = productVO.getPropertyObjs();
		PropertyObjVO propertyObjVO = null;
		for(int i = 0, length = propertyObjVOs.size(); i < length; i++) {
			propertyObjVO = propertyObjVOs.get(i);
			String value = propertyObjVO.getValue();
			Integer propertyId = propertyObjVO.getPropertyId();
			propertyObjService.save(created_by, productId, categoryId, propertyId, value);
		}
		String urls[] = productVO.getImgUrls();
		// 获取商品图片对应的const
		Const con = constService.getByTypeAndCode("file", FileConst.PRODUCT).get(0);
		Integer typeId = con.getId();
		Attachment attachment = null;
		AttachmentObj attachmentObj = null;
		attachmentObjService.deleteByParam(typeId, productId);
		for(int i = 0, length = urls.length; i < length; i++) {
			attachment = new Attachment();
			attachment.setCon(con);
			attachment.setCreate_date(now);
			attachment.setCreated_by(created_by);
			attachment.setIs_deleted("N");
			attachment.setPath(urls[i]);
			attachment.setUpdate_date(now);
			attachment.setUpdated_by(created_by);
			attachmentService.saveOrUpdate(attachment);
			
			attachmentObj = new AttachmentObj();
			attachmentObj.setType_id(typeId);
			attachmentObj.setCreate_date(now);
			attachmentObj.setUpdate_date(now);
			attachmentObj.setCreated_by(created_by);
			attachmentObj.setUpdated_by(created_by);
			attachmentObj.setObj_id(productId);
			attachmentObj.setAttachment_id(attachment.getId());
			attachmentObjService.save(attachmentObj);
		}
	}

}