package com.cn.base;

import java.util.HashMap;
import java.util.Map;

public class BaseController {

	public Map<String, Object> getMap(Object obj) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("success", true);
		map.put("data", obj);
		
		return map;
	}
}