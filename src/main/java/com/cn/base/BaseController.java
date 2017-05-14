package com.cn.base;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.cn.entity.User;

public class BaseController {
	
	public HttpSession getSession() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession();
		return session;
	}
	
	public Integer getUserId() {
		HttpSession session = getSession();
		Object obj = session.getAttribute("user");
		if (obj != null) {
			User user = (User) obj;
			return user.getId();
		} else {
			return null;
		}
	}
	
	public void setAttribute(String key, Object value) {
		HttpSession session = getSession();
		session.setAttribute(key, value);
	}
	
	public Map<String, Object> getMap(Object obj) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("success", true);
		map.put("data", obj);
		
		return map;
	}
}