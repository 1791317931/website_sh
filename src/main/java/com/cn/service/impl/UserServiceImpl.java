package com.cn.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
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
	public Map<String, Object> updateUserStatus(int id, String valid, String status) {
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> map = new HashMap<String, Object>();
		result.put("success", true);

		if (StringUtils.isNotBlank(valid)) {
			map.put("is_valid", valid);
			if (ValidConst.VALID.equals(valid)) {
				map.put("status", UserStatusConst.PASS);
			}
		} else {
			// 如果状态为空，那么修改审核流程
			if (StringUtils.isBlank(status)) {
				result.put("success", false);
				result.put("msg", "参数不能为空");
				return result;
			} else {
				map.put("status", status);
				if (UserStatusConst.PASS.equals(status)) {
					map.put("is_valid", ValidConst.VALID);
				}
			}
		}
		
		userDao.updateByParam(id, map);
		return result;
	}
	
	@Override
	public Page getPageByParam(int pageSize, int currentPage, String username,
			String phone, Integer typeId, String valid, String status) {
		Page page = new Page(pageSize, currentPage);
		return userDao.getPageByParam(page, username, phone, typeId, valid, status);
	}
	
	@Override
	public void updatePassword(int id, String password) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("password", MD5Util.EncoderPwdByMd5AndApacheBase64(password));
		userDao.updateByParam(id, map);
	}
	
}