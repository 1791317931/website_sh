package com.cn.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cn.base.BaseController;

@Controller
@RequestMapping(value = "/user")
public class UserController extends BaseController {

	@RequestMapping(value = "/index")
	public String index() {
		return "user/index";
	}
	
	
	@RequestMapping(value = "/toRegist")
	public String toRegist() {
		return "admin/users/regist";
	}
	
	@RequestMapping(value = "/toLogin")
	public String toLogin() {
		return "users/login";
	}
	
	public Map<String, Object> regist() {
		return null;
	}
	
}