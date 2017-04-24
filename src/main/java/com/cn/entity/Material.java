package com.cn.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cn.base.IdEntity;

@Entity
@Table(name = "w_material")
public class Material extends IdEntity {

	private static final long serialVersionUID = -6771713881902986134L;
	
	private Category category;
	
	private String name;
	
	private String code;
	
	private String is_valid;
	
	// 状态：N（新增）、P（审核通过）、F（审核失败）、S（特价处理中）
	private String status;
	
	private double price;
	
	// 特价
	private double special_price;
	
	private int count;

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

	@ManyToOne
	@JoinColumn(name = "category_id")
	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
	
}