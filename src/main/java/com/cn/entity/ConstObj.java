package com.cn.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cn.base.IdEntity;

@Entity
@Table(name = "w_const_obj")
public class ConstObj extends IdEntity {

	private static final long serialVersionUID = -7504779418315783680L;

	private Const con;
	
	private Integer obj_id;
	
	private Integer sort;

	@ManyToOne
	@JoinColumn(name = "type_id")
	public Const getCon() {
		return con;
	}

	public void setCon(Const con) {
		this.con = con;
	}

	public Integer getObj_id() {
		return obj_id;
	}

	public void setObj_id(Integer obj_id) {
		this.obj_id = obj_id;
	}

	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}
	
}