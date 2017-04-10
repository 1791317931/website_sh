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
	
	@RequestMapping(value = "/header")
	public String header() {
		return "user/main";
	}
	
	@RequestMapping(value = "/footer")
	public String footer() {
		return "user/main";
	}
	
}