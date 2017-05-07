package com.cn.vo;

import java.util.List;

import com.cn.base.IdEntity;

public class ProductVO extends IdEntity {

	private static final long serialVersionUID = 6146383097145661850L;

	private String name;
	
	private String code;
	
	private String isValid;
	
	private String status;
	
	private double price;
	
	private double specialPrice;
	
	private int count;
	
	private String description;
	
	private Integer categoryId;
	
	private Integer typeId;
	
	private String categoryName;
	
	private String imgUrls[];
	
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

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
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

	public String[] getImgUrls() {
		return imgUrls;
	}

	public void setImgUrls(String[] imgUrls) {
		this.imgUrls = imgUrls;
	}

	public List<PropertyObjVO> getPropertyObjs() {
		return propertyObjs;
	}

	public void setPropertyObjs(List<PropertyObjVO> propertyObjs) {
		this.propertyObjs = propertyObjs;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Integer getTypeId() {
		return typeId;
	}

	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}
	
}