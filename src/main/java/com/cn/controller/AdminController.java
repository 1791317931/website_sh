package com.cn.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cn.base.BaseController;

@Controller
@RequestMapping(value = "/admin")
public class AdminController extends BaseController {
	
	@RequestMapping(value = "/index")
	public String index() {
		return "admin/index";
	}
	
}