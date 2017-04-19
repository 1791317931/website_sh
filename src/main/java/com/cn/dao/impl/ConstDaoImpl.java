package com.cn.dao.impl;

import java.util.List;

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
	
	public List<Const> getByTypeAndCode(String type, Integer code) {
		String sql = "from Const c where c.type = ? ";
		if (code != null) {
			return getListByQuery(sql, type);
		} else {
			sql += "and c.code = ?";
			return getListByQuery(sql, type, code);
		}
	}

}