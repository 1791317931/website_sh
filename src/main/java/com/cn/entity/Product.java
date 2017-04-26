package com.cn.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cn.base.IdEntity;

@Entity
@Table(name = "w_product")
public class Product extends IdEntity {

	private static final long serialVersionUID = -2285792653617753234L;
	
	private Category category;
	
	// 商品分类	热销、推荐...，可以为空
	private Integer type_id;
	
	private String name;
	
	private String code;
	
	private String is_valid;
	
	// 状态：N（新增）、P（审核通过）、F（审核失败）、S（特价处理中）
	private String status;
	
	private double price;
	
	// 库存
	private Integer count;
	
	// 特价
	private double special_price;

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

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public Integer getType_id() {
		return type_id;
	}

	public void setType_id(Integer type_id) {
		this.type_id = type_id;
	}

}