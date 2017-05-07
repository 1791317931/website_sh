package com.cn.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.cn.base.IdEntity;

@Entity
@Table(name = "w_shopcar")
public class ShopCar extends IdEntity {

	private static final long serialVersionUID = -1719333659592864165L;

	private int count;
	
	private int product_id;
	
	private int user_id;

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public int getProduct_id() {
		return product_id;
	}

	public void setProduct_id(int product_id) {
		this.product_id = product_id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	
}