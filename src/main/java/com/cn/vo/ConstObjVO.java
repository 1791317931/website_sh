package com.cn.vo;

import com.cn.base.IdEntity;

public class ConstObjVO extends IdEntity {

	private static final long serialVersionUID = 9114001843171592220L;

	private Integer typeId;
	
	private Integer objId;
	
	private Integer sort;

	public Integer getTypeId() {
		return typeId;
	}

	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}

	public Integer getObjId() {
		return objId;
	}

	public void setObjId(Integer objId) {
		this.objId = objId;
	}

	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}
	
}