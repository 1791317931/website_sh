package com.cn.service;

import java.util.List;

import com.cn.entity.Product;
import com.cn.vo.ConstProductVO;
import com.cn.vo.Page;
import com.cn.vo.ProductVO;

public interface ProductService {

	public Page getSimplePageByParam(int pageSize, int currentPage, String name,
			String code, String valid);
	
	public Product getDetail(int id);
	
	public void saveOrUpdate(ProductVO productVO, int created_by);
	
	public void deleteById(int id);
	
	public List<ConstProductVO> getListByTypeId(int typeId);
	
	public List<Product> getListByIds(List<Integer> ids);
	
}