package com.cn.service;

import java.util.Map;

import com.cn.entity.User;
import com.cn.vo.Page;

public interface UserService {
	
	public User getById(int id);

	public User getByPhone(String valid, String phone, String password);
	
	public int countByUsernameOrPhone(String valid, String username, String phone);
	
	public void saveOrUpdate(User user);
	
	public Map<String, Object> updateUserStatus(User user);
	
	public Page getPageByParam(int pageSize, int currentPage, String username, String phone,
			Integer typeId, String valid, String status);
	
}