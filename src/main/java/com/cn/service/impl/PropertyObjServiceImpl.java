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
	public int countPropertyByPropertyId(int propertyId) {
		return propertyObjDao.countProductByPropertyId(propertyId);
	}

}