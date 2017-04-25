package com.cn.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.MaterialDao;
import com.cn.entity.Attachment;
import com.cn.entity.AttachmentObj;
import com.cn.entity.Category;
import com.cn.entity.Const;
import com.cn.entity.Material;
import com.cn.enums.FileConst;
import com.cn.enums.MaterialStatusConst;
import com.cn.enums.PropertyConst;
import com.cn.enums.ValidConst;
import com.cn.service.AttachmentObjService;
import com.cn.service.AttachmentService;
import com.cn.service.CategoryService;
import com.cn.service.ConstService;
import com.cn.service.MaterialService;
import com.cn.service.PropertyObjService;
import com.cn.vo.MaterialVO;
import com.cn.vo.Page;
import com.cn.vo.PropertyObjVO;

@Service(value = "materialService")
public class MaterialServiceImpl implements MaterialService {
	
	@Resource(name = "materialDao")
	private MaterialDao materialDao;
	
	@Resource(name = "categoryService")
	private CategoryService categoryService;
	
	@Resource(name = "propertyObjService")
	private PropertyObjService propertyObjService;
	
	@Resource(name = "constService")
	private ConstService constService;
	
	@Resource(name = "attachmentObjService")
	private AttachmentObjService attachmentObjService;
	
	@Resource(name = "attachmentService")
	private AttachmentService attachmentService;

	@Override
	public Page getSimplePageByParam(int pageSize, int currentPage, Map<String, Object> map) {
		Page page = new Page(pageSize, currentPage);
		return materialDao.getSimplePageByParam(page, map);
	}

	@Override
	public Material getById(int id) {
		return materialDao.get(id);
	}
	
	@Override
	public void deleteById(int id) {
		// 删除图片
		List<Const> conList = constService.getByTypeAndCode(FileConst.TYPE, FileConst.MATERIAL, null);
		Const con = conList.get(0);
		attachmentObjService.deleteByParam(con.getId(), id);
		
		// 删除附件
		List<Const> attachmentList = 
				constService.getByTypeAndCode(FileConst.TYPE, FileConst.MATERIAL_ATTACHMENT, null);
		Const attachmentConst = attachmentList.get(0);
		attachmentObjService.deleteByParam(attachmentConst.getId(), id);
		
		Map<String, Object> categoryMap = categoryService.getListByTypeCode(PropertyConst.TYPE, PropertyConst.MATERIAL).get(0);
		// 删除相关属性
		propertyObjService.deleteByObjIdAndCategoryId(id, Integer.parseInt(categoryMap.get("id") + ""));
		
		materialDao.delete(id);
	}

	@Override
	public void saveOrUpdate(MaterialVO materialVO, int created_by) {
		Integer id = materialVO.getId();
		Integer categoryId = materialVO.getCategoryId();
		Category category = categoryService.getById(categoryId);
		Material material = null;
		if(id == null) {
			material = new Material();
			material.setCode(UUID.randomUUID() + "");
		} else {
			material = materialDao.get(id);
		}
		material.setCategory(category);
		material.setCount(materialVO.getCount());
		Date now = new Date();
		material.setCreate_date(now);
		material.setUpdate_date(now);
		material.setIs_valid(ValidConst.VALID);
		material.setName(materialVO.getName());
		material.setPrice(materialVO.getPrice());
		material.setSpecial_price(materialVO.getSpecialPrice());
		material.setStatus(MaterialStatusConst.NEW);
		material.setCreated_by(created_by);
		material.setUpdated_by(created_by);
		materialDao.save(material);
		
		Integer materialId = material.getId();
		
		// 获取商品图片对应的const
		Const con = constService.getByTypeAndCode("file", FileConst.MATERIAL, null).get(0);
		Integer typeId = con.getId();
		propertyObjService.deleteByObjIdAndCategoryId(materialId, categoryId);
		
		List<PropertyObjVO> propertyObjVOs = materialVO.getPropertyObjs();
		PropertyObjVO propertyObjVO = null;
		for(int i = 0, length = propertyObjVOs.size(); i < length; i++) {
			propertyObjVO = propertyObjVOs.get(i);
			String value = propertyObjVO.getValue();
			Integer propertyId = propertyObjVO.getPropertyId();
			propertyObjService.save(created_by, materialId, categoryId, propertyId, value);
		}
		
		String urls[] = materialVO.getImgUrls();
		Attachment attachment = null;
		AttachmentObj attachmentObj = null;
		// 删除所有的图片
		attachmentObjService.deleteByParam(typeId, materialId);
		
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
			attachmentObj.setObj_id(materialId);
			attachmentObj.setAttachment_id(attachment.getId());
			attachmentObjService.save(attachmentObj);
		}
		
		String attachmentUrls[] = materialVO.getAttachmentUrls();
		Const attachmentCon = constService.getByTypeAndCode("file", FileConst.MATERIAL_ATTACHMENT, null).get(0);
		Integer attachmentTypeId = attachmentCon.getId();
		Attachment attachmentFile = null;
		AttachmentObj attachmentFileObj = null;
		
		// 删除所有的附件
		attachmentObjService.deleteByParam(attachmentTypeId, materialId);
		
		for(int i = 0, length = attachmentUrls.length; i < length; i++) {
			attachmentFile = new Attachment();
			attachmentFile.setCon(attachmentCon);
			attachmentFile.setCreate_date(now);
			attachmentFile.setCreated_by(created_by);
			attachmentFile.setIs_deleted("N");
			attachmentFile.setPath(attachmentUrls[i]);
			attachmentFile.setUpdate_date(now);
			attachmentFile.setUpdated_by(created_by);
			attachmentService.saveOrUpdate(attachmentFile);
			
			attachmentFileObj = new AttachmentObj();
			attachmentFileObj.setType_id(attachmentCon.getId());
			attachmentFileObj.setCreate_date(now);
			attachmentFileObj.setUpdate_date(now);
			attachmentFileObj.setCreated_by(created_by);
			attachmentFileObj.setUpdated_by(created_by);
			attachmentFileObj.setObj_id(materialId);
			attachmentFileObj.setAttachment_id(attachmentFile.getId());
			attachmentObjService.save(attachmentFileObj);
		}
	}

}