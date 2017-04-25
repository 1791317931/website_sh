package com.cn.dao;

import java.util.List;

import com.cn.base.BaseDao;
import com.cn.entity.Product;
import com.cn.vo.Page;

public interface ProductDao extends BaseDao<Product> {

	public Page getSimplePageByParam(Page page, String name, String code);
	
	public List<Product> getListByTypeId(int typeId, String valid);
	
	public int countByTypeId(int typeId, String valid);
	
	public void deleteByTypeId(int typeId);
	
}