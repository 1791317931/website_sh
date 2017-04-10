package com.cn.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cn.base.IdEntity;

@Entity
@Table(name = "w_category")
public class Category extends IdEntity {

	private static final long serialVersionUID = 733623297142524250L;
	
	private String name;
	
	private Const con;
	
	private String is_valid;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@ManyToOne
	@JoinColumn(name = "type_id")
	public Const getCon() {
		return con;
	}

	public void setCon(Const con) {
		this.con = con;
	}

	public String getIs_valid() {
		return is_valid;
	}

	public void setIs_valid(String is_valid) {
		this.is_valid = is_valid;
	}
	
}