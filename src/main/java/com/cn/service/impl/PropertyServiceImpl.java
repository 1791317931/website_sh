package com.cn.service.impl;

import java.util.Date;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.PropertyDao;
import com.cn.entity.Const;
import com.cn.entity.Property;
import com.cn.service.PropertyService;
import com.cn.vo.Page;

@Service(value = "propertyService")
public class PropertyServiceImpl implements PropertyService {
	
	@Resource(name = "propertyDao")
	private PropertyDao propertyDao;

	@Override
	public Page getPage(int pageSize, int currentPage, Integer typeId) {
		Page page = new Page(pageSize, currentPage);
		return propertyDao.getPage(page, typeId);
	}
	
	@Override
	public void saveOrUpdate(Property property, int typeId) {
		
		int created_by = 1;
		property.setUpdated_by(created_by);
		Const con = new Const();
		con.setId(typeId);
		property.setCon(con);
		if(property.getId() == null) {
			Date now = new Date();
			property.setUpdate_date(now);
			property.setCreate_date(now);
			property.setCreated_by(created_by);
			property.setIs_valid("Y");
			propertyDao.save(property);
		} else {
			propertyDao.updateBySql(property);
		}
	}
	
	@Override
	public Property get(int id) {
		return propertyDao.get(id);
	}
	
	@Override
	public void deleteById(int id) {
		propertyDao.deleteById(id);
	}

}