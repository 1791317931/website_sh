package com.cn.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.cn.base.IdEntity;

@Entity
@Table(name = "w_comment")
public class Comment extends IdEntity {

	private static final long serialVersionUID = 594807851838052419L;
	
	private String note;
	
	private int product_id;
	
	// 回复某条评论
	private Integer apply_to;

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public int getProduct_id() {
		return product_id;
	}

	public void setProduct_id(int product_id) {
		this.product_id = product_id;
	}

	public Integer getApply_to() {
		return apply_to;
	}

	public void setApply_to(Integer apply_to) {
		this.apply_to = apply_to;
	}

}