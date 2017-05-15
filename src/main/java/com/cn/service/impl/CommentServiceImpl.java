package com.cn.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.CommentDao;
import com.cn.entity.Comment;
import com.cn.service.CommentService;
import com.cn.vo.CommentVO;
import com.cn.vo.Page;

@Service(value = "commentService")
public class CommentServiceImpl implements CommentService {
	
	@Resource(name = "commentDao")
	private CommentDao commentDao;

	@Override
	public Page getPageByProductId(int pageSize, int currentPage, int productId) {
		Page page = new Page(pageSize, currentPage);
		page = commentDao.getPageByProductId(page, productId);
		transformTo(page);
		return page;
	}

	@Override
	public Map<String, Object>  deleteById(int id) {
		Map<String, Object> result = new HashMap<String, Object>();
		// 先判断该评论是否被回复
		if (commentDao.countById(id) > 0) {
			commentDao.delete(id);
			result.put("success", true);
		} else {
			result.put("success", false);
			result.put("msg", "该条评论已经被回复，不能删除");
		}
		
		return result;
	}

	@Override
	public void addComment(Comment comment, int userId) {
		Date now = new Date();
		comment.setCreate_date(now);
		comment.setUpdate_date(now);
		comment.setCreated_by(userId);
		comment.setUpdated_by(userId);
		commentDao.save(comment);
	}
	
	@SuppressWarnings("unchecked")
	public static void transformTo(Page page) {
		List<Object[]> list = page.getList();
		List<CommentVO> vos = new ArrayList<CommentVO>();
		CommentVO vo = null;
		for (int i = 0, length = list.size(); i < length; i++) {
			vo = new CommentVO();
			Object[] objs = list.get(i);
			vo.setId(Integer.parseInt(objs[0] + ""));
			vo.setNote(objs[1] + "");
			vo.setCreated_by(Integer.parseInt(objs[2] + ""));
			vo.setUsername(objs[3] + "");
			vo.setProductId(Integer.parseInt(objs[4] + ""));
			vo.setCreate_date((Date) objs[5]);
			vo.setHeadUrl(objs[6] + "");
			
			vos.add(vo);
		}
		
		page.setList(vos);
	}
	
}