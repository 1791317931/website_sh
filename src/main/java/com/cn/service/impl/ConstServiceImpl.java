package com.cn.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.ConstDao;
import com.cn.entity.Const;
import com.cn.service.ConstService;
import com.cn.vo.Page;

@Service(value = "constService")
public class ConstServiceImpl implements ConstService {

	@Resource(name = "constDao")
	private ConstDao constDao;
	
	@Override
	public Page getPageByType(int pageSize, int currentPage, String type) {
		Page page = new Page(pageSize, currentPage);
		return constDao.getPageByType(page, type);
	}
	
	public List<Const> getListByType(String type) {
		return constDao.getListByQuery("from Const c where c.type = ?", type);
	}
	
}