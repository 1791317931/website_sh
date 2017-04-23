package com.cn.dao;

import com.cn.base.BaseDao;
import com.cn.entity.Material;
import com.cn.vo.Page;

public interface MaterialDao extends BaseDao<Material> {

	public Page getPageObjByParam();
}