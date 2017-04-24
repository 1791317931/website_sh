package com.cn.dao;

import java.util.Map;

import com.cn.base.BaseDao;
import com.cn.entity.Material;
import com.cn.vo.Page;

public interface MaterialDao extends BaseDao<Material> {

	public Page getSimplePageByParam(Page page, Map<String, Object> map);
}