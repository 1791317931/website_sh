package com.cn.controller;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.base.BaseController;
import com.cn.service.ConstService;

@Controller
@RequestMapping(value = "/const")
public class ConstController extends BaseController {
	
	@Resource(name = "constService")
	private ConstService constService;

	@RequestMapping(value = "/role")
	public String role() {
		return "admin/consts/index";
	}
	
	@RequestMapping(value = "/page")
	@ResponseBody
	public Map<String, Object> getPage(int pageSize, int currentPage, String type) {
		return getMap(constService.getPageByType(pageSize, currentPage, type));
	}
	
	@RequestMapping(value = "/list")
	@ResponseBody
	public Map<String, Object> getList(String type) {
		return getMap(constService.getByTypeAndCode(type, null));
	}
	
	@RequestMapping(value = "/supply")
	public String supply() {
		return "admin/consts/supply";
	}
	
}