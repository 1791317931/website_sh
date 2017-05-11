package com.cn.vo;

import com.cn.base.IdEntity;

public class CommentVO extends IdEntity {

	private static final long serialVersionUID = 7541290742727130853L;

	private String note;
	
	private int productId;
	
	private String productName;
	
	// 回复某条评论
	private Integer applyToId;
	
	private Integer applyUserId;
	
	private String applyUsername;
	
	// 头像
	private String applyUserUrl;
	
	// 被评论的内容
	private String applyNote;

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public Integer getApplyToId() {
		return applyToId;
	}

	public void setApplyToId(Integer applyToId) {
		this.applyToId = applyToId;
	}

	public Integer getApplyUserId() {
		return applyUserId;
	}

	public void setApplyUserId(Integer applyUserId) {
		this.applyUserId = applyUserId;
	}

	public String getApplyUsername() {
		return applyUsername;
	}

	public void setApplyUsername(String applyUsername) {
		this.applyUsername = applyUsername;
	}

	public String getApplyUserUrl() {
		return applyUserUrl;
	}

	public void setApplyUserUrl(String applyUserUrl) {
		this.applyUserUrl = applyUserUrl;
	}

	public String getApplyNote() {
		return applyNote;
	}

	public void setApplyNote(String applyNote) {
		this.applyNote = applyNote;
	}
	
}