package com.cn.dao;

import com.cn.base.BaseDao;
import com.cn.entity.Comment;
import com.cn.vo.Page;

public interface CommentDao extends BaseDao<Comment> {

	public Page getPageByProductId(Page page, int productId);
	
	public int countById(int id);
	
}