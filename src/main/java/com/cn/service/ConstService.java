package com.cn.service;

import java.util.List;
import java.util.Map;

import com.cn.entity.Const;
import com.cn.vo.Page;

public interface ConstService {
	
	public Const getById(int id);
	
	public Page getPageByType(int pageSize, int currentPage, String type);
	
	public List<Const> getByTypeAndCode(String type, Integer code, String value);
	
	public Map<String, Object> deleteById(int id);
	
	public Map<String, Object> saveOrUpdate(Const con, int created_by);

}