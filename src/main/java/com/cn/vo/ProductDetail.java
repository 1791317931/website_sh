package com.cn.vo;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

// TODO
public class ProductDetail {

	private Integer id;
	
	private String name;
	
	private String code;
	
	private String isValid;
	
	private String status;
	
	private double price;
	
	private double specialPrice;
	
	private int count;
	
	private Integer categoryId;
	
	private String categoryName;
	
	private Integer created_by;
	
	private Integer updated_by;
	
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date create_date;
	
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date update_date;
	
	private List<PropertyObjVO> propertyObjVOs;
	
	private List<String> urls;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

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

	public Integer getCreated_by() {
		return created_by;
	}

	public void setCreated_by(Integer created_by) {
		this.created_by = created_by;
	}

	public Integer getUpdated_by() {
		return updated_by;
	}

	public void setUpdated_by(Integer updated_by) {
		this.updated_by = updated_by;
	}

	public Date getCreate_date() {
		return create_date;
	}

	public void setCreate_date(Date create_date) {
		this.create_date = create_date;
	}

	public Date getUpdate_date() {
		return update_date;
	}

	public void setUpdate_date(Date update_date) {
		this.update_date = update_date;
	}

	public List<PropertyObjVO> getPropertyObjVOs() {
		return propertyObjVOs;
	}

	public void setPropertyObjVOs(List<PropertyObjVO> propertyObjVOs) {
		this.propertyObjVOs = propertyObjVOs;
	}

	public List<String> getUrls() {
		return urls;
	}

	public void setUrls(List<String> urls) {
		this.urls = urls;
	}
	
}