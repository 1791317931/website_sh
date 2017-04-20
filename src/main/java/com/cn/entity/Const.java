package com.cn.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.cn.base.IdEntity;

@Entity
@Table(name = "w_const")
public class Const extends IdEntity {

	private static final long serialVersionUID = 763024337126365965L;
	
	private String type;
	
	private Integer code;
	
	private String value;
	
	private String description;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
}