package com.cn.dao.impl;

import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.CommentDao;
import com.cn.entity.Comment;
import com.cn.vo.Page;

@Repository(value = "commentDao")
public class CommentDaoImpl extends BaseDaoImpl<Comment> implements CommentDao {

	public CommentDaoImpl() {
		super(Comment.class);
	}

	@Override
	public Page getPageByProductId(Page page, int productId) {
		return null;
	}

	@Override
	public int countById(int id) {
		String sql = "select count(1) from w_comment wc where wc.apply_to = " + id;
		return Integer.parseInt(getSession().createSQLQuery(sql).uniqueResult() + "");
	}
	
}