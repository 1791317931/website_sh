package com.cn.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.cn.dao.UserDao;
import com.cn.entity.Const;
import com.cn.entity.User;
import com.cn.enums.FileConst;
import com.cn.enums.UserStatusConst;
import com.cn.enums.ValidConst;
import com.cn.service.AttachmentObjService;
import com.cn.service.ConstService;
import com.cn.service.UserService;
import com.cn.util.MD5Util;
import com.cn.vo.Page;
import com.cn.vo.UserVO;

@Service(value = "userService")
public class UserServiceImpl implements UserService {
	
	@Resource(name = "userDao")
	private UserDao userDao;
	
	@Resource(name = "constService")
	private ConstService constService;
	
	@Resource(name = "attachmentObjService")
	private AttachmentObjService attachmentObjService;

	@Override
	public User getById(int id) {
		return userDao.get(id);
	}
	
	public UserVO getDetailById(int id) {
		User user = userDao.get(id);
		List<String> imgUrls = attachmentObjService.getUrlsByObjIdAndCode(id, FileConst.USER, null);
		return transformTo(user, imgUrls);
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
	public Map<String, Object> saveOrUpdate(User user) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", true);
		
		userDao.save(user);
		
		return result;
	}
	
	@Override
	public Map<String, Object> updateInfo(User user) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", true);
		
		Integer userId = user.getId();
		User oldUser = userDao.get(userId);
		
		String phone = user.getPhone();
		// 如果手机号有改动，要校验是否重复
		if (!phone.equals(oldUser.getPhone())) {
			if (userDao.countByUsernameOrPhone(ValidConst.VALID, "", phone) > 0) {
				result.put("success", false);
				result.put("msg", "该手机号已存在");
				return result;
			}
		}
		if (StringUtils.isNotBlank(phone)) {
			oldUser.setPhone(phone);
		}
		String username = user.getUsername();
		if (StringUtils.isNotBlank(username)) {
			oldUser.setUsername(username);
		}
		String real_name = user.getReal_name();
		if (StringUtils.isNotBlank(real_name)) {
			oldUser.setReal_name(real_name);
		}
		Integer age = user.getAge();
		if (age != null) {
			oldUser.setAge(age);
		}
		String sex = user.getSex();
		if (StringUtils.isNotBlank(sex)) {
			oldUser.setSex(sex);
		}
		
		userDao.save(oldUser);
		
		return result;
	}
	
	/**
	 * 修改角色的用户必须是有效的
	 */
	@Override
	public Map<String, Object> updateRole(int id, int roleId, int updated_by) {
		User oldUser = userDao.get(id);
		Map<String, Object> result = new HashMap<String, Object>();
		boolean success = true;
		String msg = "";
		
		if ("N".equals(oldUser.getStatus())) {
			success = false;
			msg = "该用户已经失效，不能修改角色";
		} else {
			Date now = new Date();
			oldUser.setUpdate_date(now);
			oldUser.setUpdated_by(updated_by);
			Const role = constService.getById(roleId);
			oldUser.setCon(role);
			userDao.save(oldUser);
		}
		
		result.put("success", success);
		result.put("msg", msg);
		
		return result;
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
	
	@Override
	public boolean validPassword(int id, String password) {
		password = MD5Util.EncoderPwdByMd5AndApacheBase64(password);
		return userDao.countByIdAndPassword(id, password, "P") > 0;
	}
	
	public static UserVO transformTo(User user, List<String> imgUrls) {
		UserVO vo = new UserVO();
		vo.setId(user.getId());
		vo.setAge(user.getAge());
		vo.setCreate_date(user.getCreate_date());
		vo.setCreated_by(user.getCreated_by());
		if (imgUrls != null && imgUrls.size() > 0) {
			vo.setImgUrl(imgUrls.get(0));
		}
		vo.setIs_valid(user.getIs_valid());
		vo.setPhone(user.getPhone());
		vo.setReal_name(user.getReal_name());
		vo.setSex(user.getSex());
		vo.setStatus(user.getStatus());
		vo.setUpdate_date(user.getUpdate_date());
		vo.setUpdated_by(user.getUpdated_by());
		vo.setUsername(user.getUsername());
		
		return vo;
	}
	
}