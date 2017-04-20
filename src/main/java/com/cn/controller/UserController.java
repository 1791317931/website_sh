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
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.base.BaseController;
import com.cn.entity.Const;
import com.cn.entity.User;
import com.cn.enums.UserConst;
import com.cn.service.ConstService;
import com.cn.service.UserService;
import com.cn.util.MD5Util;

@Controller
@RequestMapping(value = "/user")
public class UserController extends BaseController {
	
	@Resource(name = "userService")
	private UserService userService;
	
	@Resource(name = "constService")
	private ConstService constService;

	@RequestMapping(value = "/index")
	public String index() {
		return "user/index";
	}
	
	@RequestMapping(value = "/regist", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> regist(HttpServletRequest request, 
			String username, String phone, String password) {
		Map<String, Object> result = new HashMap<String, Object>();
		if (userService.countByUsernameOrPhone(username, phone) > 0) {
			String msg = "用户名或密码重复";
			result.put("code", 0);
			result.put("msg", msg);
		} else {
			User user = new User();
			user.setPhone(phone);
			user.setPassword(MD5Util.EncoderPwdByMd5AndApacheBase64(password));
			user.setUsername(username);
			user.setIs_valid("Y");
			user.setStatus("Y");
			List<Const> list = constService.getByTypeAndCode("user_type", UserConst.ADMIN);
			Const con = list.get(0);
			user.setCon(con);
			
			user.setCreated_by(created_by);
			user.setUpdated_by(created_by);
			Date now = new Date();
			user.setCreate_date(now);
			user.setUpdate_date(now);
			
			userService.saveOrUpdate(user);
			
			HttpSession session = request.getSession();
			session.setAttribute("user", user);
			
			result.put("code", 1);
		}
		return getMap(result);
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> login(HttpServletRequest request, String phone, String password) {
		User user = userService.getByPhone(phone, password);
		if (user != null) {
			HttpSession session = request.getSession();
			session.setAttribute("user", user);
			return getMap(user);
		} else {
			return getMap(null);
		}
	}

	@RequestMapping(value = "/logout")
	public String logout(HttpSession session) {
		session.removeAttribute("user");
		return "redirect:/main/index";
	}
	
}