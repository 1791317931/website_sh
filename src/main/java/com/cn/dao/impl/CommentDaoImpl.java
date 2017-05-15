package com.cn.dao.impl;

import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.CommentDao;
import com.cn.entity.Comment;
import com.cn.enums.FileConst;
import com.cn.vo.Page;

@Repository(value = "commentDao")
public class CommentDaoImpl extends BaseDaoImpl<Comment> implements CommentDao {

	public CommentDaoImpl() {
		super(Comment.class);
	}

	@Override
	public Page getPageByProductId(Page page, int productId) {
		String sql = "select wc.id, wc.note, wc.created_by, wu.username, wc.product_id, wc.create_date, wa.path"
					+ " from w_comment wc"
					+ " left join w_user wu on wc.created_by = wu.id"
					+ " left join w_product wp on wc.product_id = wp.id"
					+ " left join w_attachment_obj wao on wao.obj_id = wu.id"
					+ " left join w_attachment wa on wao.attachment_id = wa.id"
					+ " left join w_const wc1 on wa.type_id = wc1.id"
					+ " where wc.product_id = " + productId
					+ " and wc1.type = '" + FileConst.TYPE + "'"
					+ " and wc1.code = " + FileConst.USER
					+ " order by wc.create_date desc";
		return getPageObjBySQL(sql, page);
	}

	@Override
	public int countById(int id) {
		String sql = "select count(1) from w_comment wc where wc.apply_to = " + id;
		return Integer.parseInt(getSession().createSQLQuery(sql).uniqueResult() + "");
	}
	
}