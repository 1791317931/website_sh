package com.cn.dao;

import com.cn.base.BaseDao;
import com.cn.entity.Const;
import com.cn.vo.Page;

public interface ConstDao extends BaseDao<Const> {

	public Page getPageByType(Page page, String type);
	
}