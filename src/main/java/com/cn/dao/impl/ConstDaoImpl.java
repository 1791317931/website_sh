package com.cn.dao.impl;

import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.ConstDao;
import com.cn.entity.Const;
import com.cn.vo.Page;

@Repository(value = "constDao")
public class ConstDaoImpl extends BaseDaoImpl<Const> implements ConstDao {


	public ConstDaoImpl() {
		super(Const.class);
	}

	@Override
	public Page getPageByType(Page page, String type) {
		String sql = "from Const c where c.type = ?";
		return getPageByQuery(sql, page, type);
	}

}