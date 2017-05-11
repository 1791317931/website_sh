package com.cn.service;

import java.util.Map;

import com.cn.entity.Comment;
import com.cn.vo.Page;

public interface CommentService {
	
	public Page getPageByProductId(int pageSize, int currentPage, int productId);
	
	public Map<String, Object> deleteById(int id);
	
	public void addComment(Comment comment, int userId);
	
}