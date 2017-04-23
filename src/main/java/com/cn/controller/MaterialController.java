package com.cn.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cn.base.BaseController;

@Controller
@RequestMapping(value = "/material")
public class MaterialController extends BaseController {

	@RequestMapping(value = "admin/index")
	public String index() {
		return "admin/materials/material";
	}
	
	@RequestMapping(value = "admin/toEdit")
	public String toEdit(ModelMap map, int id) {
		return "admin/materials/material";
	}
	
}