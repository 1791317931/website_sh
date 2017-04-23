package com.cn.dao;

import java.util.List;

import com.cn.base.BaseDao;
import com.cn.entity.User;
import com.cn.vo.Page;

public interface UserDao extends BaseDao<User> {

	public List<User> getByPhone(String valid, String phone, String password);
	
	public int countByUsernameOrPhone(String valid, String username, String phone);
	
	public Page getPageByParam(Page page, String username, String phone,
			Integer typeId, String valid, String status);
	
}