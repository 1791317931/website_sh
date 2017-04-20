package com.cn.service;

import com.cn.entity.User;

public interface UserService {

	public User getByPhone(String phone, String password);
	
	public int countByUsernameOrPhone(String username, String phone);
	
	public void saveOrUpdate(User user);
	
}