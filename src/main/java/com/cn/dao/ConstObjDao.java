package com.cn.dao;

import com.cn.base.BaseDao;
import com.cn.entity.ConstObj;

public interface ConstObjDao extends BaseDao<ConstObj> {

	public void deleteByTypeId(int typeId);
	
}