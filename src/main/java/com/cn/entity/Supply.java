package com.cn.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.cn.base.IdEntity;

@Entity
@Table(name = "w_supply")
public class Supply extends IdEntity {

	private static final long serialVersionUID = 584016061174997556L;
	
	private Integer user_id;
	
	private String is_valid;
	
	private String is_deleted;

	public Integer getUser_id() {
		return user_id;
	}

	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}

	public String getIs_valid() {
		return is_valid;
	}

	public void setIs_valid(String is_valid) {
		this.is_valid = is_valid;
	}

	public String getIs_deleted() {
		return is_deleted;
	}

	public void setIs_deleted(String is_deleted) {
		this.is_deleted = is_deleted;
	}
	
}