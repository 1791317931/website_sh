package com.cn.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.PropertyObjDao;
import com.cn.service.PropertyObjService;

@Service(value = "propertyObjService")
public class PropertyObjServiceImpl implements PropertyObjService {

	@Resource(name = "propertyObjDao")
	private PropertyObjDao propertyObjDao;
	
	@Override
	public int countProperty(Integer productId, Integer propertyId, Integer categoryId) {
		return propertyObjDao.countObj(productId, propertyId, categoryId);
	}
	
	@Override
	public void deleteByProductId(Integer productId) {
		propertyObjDao.deleteByProductId(productId);
	}
	
	@Override
	public void save(int created_by, Integer productId, Integer categoryId, Integer propertyId, String value) {
		propertyObjDao.save(created_by, productId, categoryId, propertyId, value);
	}

}