package com.cn.controller;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.base.BaseController;
import com.cn.entity.Comment;
import com.cn.service.CommentService;

@Controller
@RequestMapping(value = "/comment")
public class CommentController extends BaseController {
	
	@Resource(name = "commentService")
	private CommentService commentService;
	
	@RequestMapping(value = "/page/byProductId")
	@ResponseBody
	public Map<String, Object> getPageByProductId(int pageSize, int currentPage, int productId) {
		return null;
	}
	
	@RequestMapping(value = "/delete/byId")
	@ResponseBody
	public Map<String, Object> deleteById(int id) {
		Map<String, Object> result = commentService.deleteById(id);
		return getMap(result);
	}
	
	@RequestMapping(value = "/save")
	@ResponseBody
	public Map<String, Object> addComment(Comment comment) {
		commentService.addComment(comment, getUserId());
		return getMap(null);
	}
	
}