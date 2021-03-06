package com.cn.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.base.BaseController;
import com.cn.entity.Const;
import com.cn.entity.User;
import com.cn.enums.UserConst;
import com.cn.enums.UserStatusConst;
import com.cn.enums.ValidConst;
import com.cn.service.ConstService;
import com.cn.service.UserService;
import com.cn.util.MD5Util;
import com.cn.vo.Page;

@Controller
@RequestMapping(value = "/user")
public class UserController extends BaseController {
	
	@Resource(name = "userService")
	private UserService userService;
	
	@Resource(name = "constService")
	private ConstService constService;

	@RequestMapping(value = "/logout")
	public String logout(HttpSession session) {
		session.removeAttribute("user");
		return "redirect:/main/index";
	}
	
	// 用户中心
	@RequestMapping(value = "/index")
	public String index() {
		return "user/index";
	}
	
	// 用户管理
	@RequestMapping(value = "/admin/index")
	public String adminIndex() {
		return "admin/users/index";
	}
	
	/**
	 * 添加用户
	 * @param request
	 * @param username
	 * @param phone
	 * @param password
	 * @param login		注册成功后是否登录
	 * @return
	 */
	@RequestMapping(value = "/regist", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> regist(HttpServletRequest request, 
			String username, String phone, String password,
			@RequestParam(defaultValue = "true") boolean login) {
		Map<String, Object> result = new HashMap<String, Object>();
		if (userService.countByUsernameOrPhone(ValidConst.VALID, username, phone) > 0) {
			String msg = "用户名或密码重复";
			result.put("code", 0);
			result.put("msg", msg);
		} else {
			User user = new User();
			user.setPhone(phone);
			user.setPassword(MD5Util.EncoderPwdByMd5AndApacheBase64(password));
			user.setUsername(username);
			user.setIs_valid(ValidConst.VALID);
			user.setStatus(UserStatusConst.PASS);
			List<Const> list = constService.getByTypeAndCode("user_type", UserConst.USER, null);
			Const con = list.get(0);
			user.setCon(con);
			
			user.setCreated_by(created_by);
			user.setUpdated_by(created_by);
			Date now = new Date();
			user.setCreate_date(now);
			user.setUpdate_date(now);
			
			userService.saveOrUpdate(user);
			
			if (login) {
				HttpSession session = request.getSession();
				session.setAttribute("user", user);
			}
			result.put("code", 1);
		}
		
		return getMap(result);
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> login(HttpServletRequest request, String phone, String password) {
		User user = userService.getByPhone(ValidConst.VALID, phone, password);
		if (user != null) {
			HttpSession session = request.getSession();
			session.setAttribute("user", user);
			return getMap(user);
		} else {
			return getMap(null);
		}
	}
	
	@RequestMapping(value = "/updatePassword", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updatePassword(int id , String password) {
		userService.updatePassword(id, password);
		return getMap(null);
	}
	
	/**
	 * 修改用户状态，需要校验权限
	 * @param id
	 * @param valid
	 * @return
	 */
	@RequestMapping(value = "/admin/update/status", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveOrUpdate(HttpServletRequest request,
			int id, String valid, String status) {
		Map<String, Object> result = new HashMap<String, Object>();
		int userType = UserConst.SUPER_ADMIN;
		if (!hasPriority(request, userType)) {
			result.put("msg", getMsgByUserType(userType));
			result.put("success", false);
			return result;
		}
		result = userService.updateUserStatus(id, valid, status);
		return getMap(result);
	}
	
	@RequestMapping(value = "/detail")
	@ResponseBody
	public Map<String, Object> getById(int id) {
		User user = userService.getById(id);
		return getMap(user);
	}

	/**
	 * 查询用户列表
	 * @param currentPage
	 * @param pageSize
	 * @param username
	 * @param typeId
	 * @return
	 */
	@RequestMapping(value = "/page", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getPageByParam(@RequestParam(defaultValue = "1") int currentPage,
			@RequestParam(defaultValue = "10") int pageSize, String username, String phone,
			Integer typeId, String valid, String status) {
		Page page = userService.getPageByParam(pageSize, currentPage, username, phone, typeId, valid, status);
		return getMap(page);
	}
	
	public static String getMsgByUserType(int userType) {
		String msg = "";
		if (userType == UserConst.SUPER_ADMIN) {
			msg = "您还没有超级管理员权限";
		} else if (userType == UserConst.ADMIN) {
			msg = "您还没有管理员权限";
		}
		return msg;
	}
	
	// 获取当前用户权限是否通过
	public static boolean hasPriority(HttpServletRequest request, int userType) {
		HttpSession session = request.getSession();
		Object obj = session.getAttribute("user");
		User user = null;
		if (obj == null) {
			return false;
		} else {
			user = (User) obj;
		}
		return user.getCon().getCode() == userType;
		
	}
	
}