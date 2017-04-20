package com.cn.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cn.base.BaseController;

@Controller
@RequestMapping(value = "/main")
public class IndexController extends BaseController {

	@RequestMapping(value = "/index")
	public String index() {
		return "user/main";
	}
	
	@RequestMapping(value = "/toRegist")
	public String toRegist() {
		return "users/regist";
	}
	
	@RequestMapping(value = "/toLogin")
	public String toLogin() {
		return "users/login";
	}
	
}