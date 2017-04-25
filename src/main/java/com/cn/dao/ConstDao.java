package com.cn.dao;

import java.util.List;

import com.cn.base.BaseDao;
import com.cn.entity.Const;
import com.cn.vo.Page;

public interface ConstDao extends BaseDao<Const> {

	public Page getPageByType(Page page, String type);
	
	public List<Const> getByTypeAndCode(String type, Integer code, String value);
	
	public List<Const> getByType(String type, Integer code, String value);
	
}