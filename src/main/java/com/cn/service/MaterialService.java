package com.cn.service;

import java.util.Map;

import com.cn.entity.Material;
import com.cn.vo.MaterialVO;
import com.cn.vo.Page;

public interface MaterialService {
	
	public Page getSimplePageByParam(int pageSize, int currentPage, Map<String, Object> map);
	
	public Material getById(int id);
	
	public void saveOrUpdate(MaterialVO materialVO, int created_by);

}