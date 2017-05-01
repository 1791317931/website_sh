package com.cn.dao.impl;

import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.ConstObjDao;
import com.cn.entity.ConstObj;

@Repository(value = "constObjDao")
public class ConstObjDaoImpl extends BaseDaoImpl<ConstObj> implements ConstObjDao {


	public ConstObjDaoImpl() {
		super(ConstObj.class);
	}

	@Override
	public void deleteByTypeId(int typeId) {
		String sql = "delete from w_const_obj where type_id = " + typeId;
		sqlUpdate(sql);
	}

}