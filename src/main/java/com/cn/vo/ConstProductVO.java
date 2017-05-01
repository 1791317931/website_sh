package com.cn.vo;

import java.util.List;

import com.cn.base.IdEntity;

public class ConstProductVO extends IdEntity {

	private static final long serialVersionUID = -7226431582870200126L;
	
	private String name;
	
	private Integer sort;
	
	private int typeId;
	
	private double price;
	
	private Integer count;
	
	private List<String> imgUrls;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}

	public int getTypeId() {
		return typeId;
	}

	public void setTypeId(int typeId) {
		this.typeId = typeId;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public List<String> getImgUrls() {
		return imgUrls;
	}

	public void setImgUrls(List<String> imgUrls) {
		this.imgUrls = imgUrls;
	}
	
}