package com.cn.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.UserDao;
import com.cn.entity.User;
import com.cn.enums.UserStatusConst;
import com.cn.enums.ValidConst;
import com.cn.service.UserService;
import com.cn.util.MD5Util;
import com.cn.vo.Page;

@Service(value = "userService")
public class UserServiceImpl implements UserService {
	
	@Resource(name = "userDao")
	private UserDao userDao;

	@Override
	public User getById(int id) {
		return userDao.get(id);
	}
	
	@Override
	public User getByPhone(String valid, String phone, String password) {
		List<User> list = userDao.getByPhone(valid, phone, MD5Util.EncoderPwdByMd5AndApacheBase64(password));
		if (list.size() > 0) {
			return list.get(0);
		} else {
			return null;
		}
	}

	@Override
	public int countByUsernameOrPhone(String valid, String username, String phone) {
		return userDao.countByUsernameOrPhone(valid, username, phone);
	}
	
	@Override
	public void saveOrUpdate(User user) {
		userDao.save(user);
	}

	@Override
	public Map<String, Object> updateUserStatus(User user) {
		Map<String, Object> result = new HashMap<String, Object>();
		String valid = user.getIs_valid();
		if (ValidConst.VALID.equals(valid)) {
			user.setStatus(UserStatusConst.PASS);
		}
		userDao.save(user);
		result.put("success", true);
		return result;
	}
	
	@Override
	public Page getPageByParam(int pageSize, int currentPage, String username,
			String phone, Integer typeId, String valid, String status) {
		Page page = new Page(pageSize, currentPage);
		return userDao.getPageByParam(page, username, phone, typeId, valid, status);
	}
	
}