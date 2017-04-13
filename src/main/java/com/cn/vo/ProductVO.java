package com.cn.vo;

import com.cn.base.IdEntity;

public class ProductVO extends IdEntity {

	private static final long serialVersionUID = 6146383097145661850L;

	private Integer id;
	
	private String name;
	
	private String code;
	
	private String is_valid;
	
	private String status;
	
	private double price;
	
	private double special_price;

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

	public String getIs_valid() {
		return is_valid;
	}

	public void setIs_valid(String is_valid) {
		this.is_valid = is_valid;
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

	public double getSpecial_price() {
		return special_price;
	}

	public void setSpecial_price(double special_price) {
		this.special_price = special_price;
	}
	
}