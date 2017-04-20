package com.cn.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.PropertyObjDao;
import com.cn.service.PropertyObjService;
import com.cn.vo.PropertyObjVO;

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
	
	@Override
	public List<PropertyObjVO> getListByObjIdAndCode(Integer objId, Integer code) {
		List<Object[]> objs = propertyObjDao.getListByObjIdAndCode(objId, code);
		List<PropertyObjVO> list = new ArrayList<PropertyObjVO>();
		PropertyObjVO vo;
		for (int i = 0, length = objs.size(); i < length; i++) {
			Object obj[] = objs.get(i);
			vo = new PropertyObjVO();
			vo.setPropertyId(Integer.parseInt(obj[0] + ""));
			vo.setName(obj[1] + "");
			vo.setValue(obj[2] + "");
			vo.setIsMust(obj[3] + "");
			list.add(vo);
		}
		return list;
	}

}