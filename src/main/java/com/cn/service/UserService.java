package com.cn.service;

import java.util.Map;

import com.cn.entity.User;
import com.cn.vo.Page;

public interface UserService {
	
	public User getById(int id);

	public User getByPhone(String valid, String phone, String password);
	
	public int countByUsernameOrPhone(String valid, String username, String phone);
	
	public Map<String, Object> saveOrUpdate(User user);
	
	public Map<String, Object> updateInfo(User user);
	
	/**
	 * 优先修改状态
	 * @param id
	 * @param valid
	 * @param status
	 * @return
	 */
	public Map<String, Object> updateUserStatus(int id, String valid, String status);
	
	public Page getPageByParam(int pageSize, int currentPage, String username, String phone,
			Integer typeId, String valid, String status);
	
	public void updatePassword(int id, String password);
	
	public boolean validPassword(int id, String password);
	
}