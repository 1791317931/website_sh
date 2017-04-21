package com.cn.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cn.base.IdEntity;

// 附件
@Entity
@Table(name = "w_attachment")
public class Attachment extends IdEntity {

	private static final long serialVersionUID = 3506990608325080437L;

	private String path;
	
	private Const con;
	
	private String is_deleted;

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getIs_deleted() {
		return is_deleted;
	}

	public void setIs_deleted(String is_deleted) {
		this.is_deleted = is_deleted;
	}

	@ManyToOne
	@JoinColumn(name = "type_id")
	public Const getCon() {
		return con;
	}

	public void setCon(Const con) {
		this.con = con;
	}

}