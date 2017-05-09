package com.cn.vo;

import java.util.List;

import com.cn.base.IdEntity;

public class ShopCarVO extends IdEntity {

	private static final long serialVersionUID = 6146383097145661850L;
	
	private int productId;

	private String name;
	
	private double price;
	
	private int count;
	
	private String description;
	
	private List<String> imgUrls;
	
	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
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

	public List<String> getImgUrls() {
		return imgUrls;
	}

	public void setImgUrls(List<String> imgUrls) {
		this.imgUrls = imgUrls;
	}
	
}