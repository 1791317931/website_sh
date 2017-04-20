package com.cn.dao;

import java.util.List;

import com.cn.base.BaseDao;
import com.cn.entity.User;

public interface UserDao extends BaseDao<User> {

	public List<User> getByPhone(String phone, String password);
	
	public int countByUsernameOrPhone(String username, String phone);
	
}