package com.cn.vo;

import java.util.List;

import com.cn.base.IdEntity;

public class MaterialVO extends IdEntity {
	
	private static final long serialVersionUID = -4030767788981320525L;

	private String name;
	
	private String code;
	
	private String isValid;
	
	private String status;
	
	private double price;
	
	private double specialPrice;
	
	private int count;
	
	private String description;
	
	private Integer categoryId;
	
	private String categoryName;
	
	// 图片路径
	private String imgUrls[];
	
	// 附件路径
	private String attachmentUrls[];
	
	private List<PropertyObjVO> propertyObjs;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getIsValid() {
		return isValid;
	}

	public void setIsValid(String isValid) {
		this.isValid = isValid;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public double getSpecialPrice() {
		return specialPrice;
	}

	public void setSpecialPrice(double specialPrice) {
		this.specialPrice = specialPrice;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String[] getImgUrls() {
		return imgUrls;
	}

	public void setImgUrls(String[] imgUrls) {
		this.imgUrls = imgUrls;
	}

	public String[] getAttachmentUrls() {
		return attachmentUrls;
	}

	public void setAttachmentUrls(String[] attachmentUrls) {
		this.attachmentUrls = attachmentUrls;
	}

	public List<PropertyObjVO> getPropertyObjs() {
		return propertyObjs;
	}

	public void setPropertyObjs(List<PropertyObjVO> propertyObjs) {
		this.propertyObjs = propertyObjs;
	}
	
}