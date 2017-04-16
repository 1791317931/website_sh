package com.cn.service;

public interface PropertyObjService {

	public int countProperty(Integer productId, Integer propertyId, Integer categoryId);
	
	public void deleteByProductId(Integer productId);
	
	public void save(int created_by, Integer productId, Integer categoryId, Integer propertyId, String value);
	
}