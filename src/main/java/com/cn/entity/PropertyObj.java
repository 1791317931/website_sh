package com.cn.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cn.base.IdEntity;

@Entity
@Table(name = "w_property_category_obj")
public class PropertyObj extends IdEntity {

	private static final long serialVersionUID = 4601098458483755724L;
	
	private Property property;
	
	private Category category;
	
	private Product product;
	
	private String value;

	@ManyToOne
	@JoinColumn(name = "property_id")
	public Property getProperty() {
		return property;
	}

	public void setProperty(Property property) {
		this.property = property;
	}

	@ManyToOne
	@JoinColumn(name = "product_id")
	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}
	
	@ManyToOne
	@JoinColumn(name = "category_id")
	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
	
}