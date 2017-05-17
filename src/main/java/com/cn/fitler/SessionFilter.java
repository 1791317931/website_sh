package com.cn.fitler;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class SessionFilter implements Filter {
	
	// 以下路径都需要检测是否登录
	public static final String validateUrls[] = {
		"/attachment/*",
		
		"/category/saveOrUpdate",
		"/category/property/delete",
		
		"/comment/delete/byId",
		"/comment/save",
		
		"/const/delete",
		"/const/saveOrUpdate",
		
		"/material/delete",
		"/material/saveOrUpdate",
		
		"/product/saveOrUpdate/*",
		"/product/delete",
		
		"/property/saveOrUpdate",
		"/property/delete",
		"/property/obj/delete",
		
		"/shopcar/add",
		"/shopcar/delete/byIds",
		"/shopcar/batchSave",
		
		"/user/update*",
		"/user/admin/update/status"
	};

	@Override
	public void destroy() {
		
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) resp;
		HttpSession session = request.getSession();
		String header = request.getHeader("x-requested-with");

		/**
		 * 如果已登录，不需要继续校验
		 * 并且是ajax请求，请求头中会带有"XMLHttpRequest"
		 */
		if (session.getAttribute("user") == null && "XMLHttpRequest".equalsIgnoreCase(header)) {
			String path = request.getContextPath();
			if ("/".equals(path)) {
				path = "";
			}
			String url = request.getRequestURI();
			String reg = null;
			Pattern pattern = null;
			Matcher matcher = null;
			for (int i = 0, length = validateUrls.length; i < length; i++) {
				reg = "^" + path + validateUrls[i];
				pattern = Pattern.compile(reg);
				matcher = pattern.matcher(url);
				if (matcher.matches()) {
					response.getOutputStream().print(401);
					return;
				}
			}
			
		}
		
		chain.doFilter(request, response);
	}

	@Override
	public void init(FilterConfig config) throws ServletException {
		
	}

}