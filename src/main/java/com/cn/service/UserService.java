package com.cn.service;

import java.util.Map;

import com.cn.entity.User;
import com.cn.vo.Page;
import com.cn.vo.UserVO;

public interface UserService {
	
	public User getById(int id);
	
	public UserVO getDetailById(int id);

	public User getByPhone(String valid, String phone, String password);
	
	public int countByUsernameOrPhone(String valid, String username, String phone);
	
	public Map<String, Object> saveOrUpdate(User user);
	
	public Map<String, Object> updateInfo(User user);
	
	public Map<String, Object> updateRole(int id, int roleId, int updated_by);
	
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