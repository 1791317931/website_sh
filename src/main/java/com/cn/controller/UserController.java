package com.cn.controller;

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
	
}