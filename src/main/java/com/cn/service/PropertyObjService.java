package com.cn.service;

import java.util.List;

import com.cn.vo.PropertyObjVO;

public interface PropertyObjService {

	public int countProperty(Integer productId, Integer propertyId, Integer categoryId);
	
	public void deleteByObjIdAndCategoryId(Integer objId, int categoryId);
	
	public void save(int created_by, Integer productId, Integer categoryId, Integer propertyId, String value);
	
	public List<PropertyObjVO> getListByObjIdAndCode(Integer objId, Integer code);
	
}