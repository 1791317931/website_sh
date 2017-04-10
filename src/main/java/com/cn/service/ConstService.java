package com.cn.service;

import java.util.List;

import com.cn.entity.Const;
import com.cn.vo.Page;

public interface ConstService {
	
	public Page getPageByType(int pageSize, int currentPage, String type);
	
	public List<Const> getListByType(String type);

}