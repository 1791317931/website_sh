package com.cn.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.cn.base.IdEntity;

@Entity
@Table(name = "w_attachment_obj")
public class AttachmentObj extends IdEntity {
	
	private static final long serialVersionUID = -2224593964184398978L;

	private Integer attachment_id;
	
	private Integer obj_id;
	
	private Integer type_id;
	
	public Integer getAttachment_id() {
		return attachment_id;
	}

	public void setAttachment_id(Integer attachment_id) {
		this.attachment_id = attachment_id;
	}

	public Integer getObj_id() {
		return obj_id;
	}

	public void setObj_id(Integer obj_id) {
		this.obj_id = obj_id;
	}

	public Integer getType_id() {
		return type_id;
	}

	public void setType_id(Integer type_id) {
		this.type_id = type_id;
	}

}