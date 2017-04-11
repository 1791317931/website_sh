package com.cn.vo;

public class CategoryVO {
	
	private Integer id;

	private String name;
	
	private Integer typeId;
	
	private Integer[] propertyIds;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getTypeId() {
		return typeId;
	}

	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}

	public Integer[] getPropertyIds() {
		return propertyIds;
	}

	public void setPropertyIds(Integer[] propertyIds) {
		this.propertyIds = propertyIds;
	}
	
}