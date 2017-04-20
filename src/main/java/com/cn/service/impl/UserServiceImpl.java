package com.cn.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.UserDao;
import com.cn.entity.User;
import com.cn.service.UserService;
import com.cn.util.MD5Util;

@Service(value = "userService")
public class UserServiceImpl implements UserService {

	@Resource(name = "userDao")
	private UserDao userDao;
	
	@Override
	public User getByPhone(String phone, String password) {
		List<User> list = userDao.getByPhone(phone, MD5Util.EncoderPwdByMd5AndApacheBase64(password));
		if (list.size() > 0) {
			return list.get(0);
		} else {
			return null;
		}
	}

	@Override
	public int countByUsernameOrPhone(String username, String phone) {
		return userDao.countByUsernameOrPhone(username, phone);
	}

	@Override
	public void saveOrUpdate(User user) {
		userDao.save(user);
	}
	
}