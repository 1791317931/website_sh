package com.cn.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.ConstDao;
import com.cn.dao.ProductDao;
import com.cn.entity.Const;
import com.cn.enums.ProductCategoryConst;
import com.cn.enums.ValidConst;
import com.cn.service.ConstService;
import com.cn.vo.Page;

@Service(value = "constService")
public class ConstServiceImpl implements ConstService {

	@Resource(name = "constDao")
	private ConstDao constDao;

	@Resource(name = "productDao")
	private ProductDao productDao;
	
	@Override
	public Const getById(int id) {
		return constDao.get(id);
	}
	
	@Override
	public Page getPageByType(int pageSize, int currentPage, String type) {
		Page page = new Page(pageSize, currentPage);
		return constDao.getPageByType(page, type);
	}
	
	@Override
	public List<Const> getByTypeAndCode(String type, Integer code, String value) {
		return constDao.getByTypeAndCode(type, code, value);
	}
	
	@Override
	public Map<String, Object> deleteById(int id) {
		Map<String, Object> result = new HashMap<String, Object>();
		boolean success = true;
		String msg = "";
		Const con = constDao.get(id);
		String type = con.getType();
		
		// 如果是商品分类
		if (ProductCategoryConst.TYPE.equals(type)) {
			int count = productDao.getListByTypeId(id, ValidConst.VALID).size();
			if (count > 0) {
				success = false;
				msg = "该分类已经存在有效的商品，无法删除";
				result.put("success", success);
				result.put("msg", msg);
				
				return result;
			} else {
				// 先删除该分类的商品
				productDao.deleteByTypeId(id);
			}
		}
		
		constDao.delete(id);
		
		result.put("success", success);
		return result;
	}
	
	@Override
	public Map<String, Object> saveOrUpdate(Const con, int created_by) {
		Map<String, Object> result = new HashMap<String, Object>();
		boolean success = true;
		String msg = "";
		
		Integer id = con.getId();
		Date now = new Date();
		Const oldConst = null;
		String type = con.getType();
		String value = con.getValue();
		Integer code = con.getCode();
		if (value == null) {
			success = false;
			msg = "标识不能为空";
		}
		if (code == null) {
			success = false;
			msg = "编号不能为空";
		}
		if (!success) {
			result.put("success", success);
			result.put("msg", msg);
			return result;
		}
		
		List<Const> list = constDao.getByType(type, code, value);
		if (id == null) {
			// 如果是新增，需要判断code和value是否已存在
			if (list.size() > 0) {
				Const existConst = list.get(0);
				if (value.equals(existConst.getValue())) {
					success = false;
					msg = "标识重复";
				}
				if (code.equals(existConst.getCode())) {
					success = false;
					msg = "编号重复";
				}
				if (!success) {
					result.put("success", success);
					result.put("msg", msg);
					return result;
				}
			}
			
			oldConst = new Const();
			oldConst.setCreate_date(now);
			oldConst.setCreated_by(created_by);
		} else {
			// 如果是修改，需要判断除本身以外code和value是否已存在
			if (list.size() > 0) {
				Const existConst = null;
				for (int i = 0, length = list.size(); i < length; i++) {
					if (!list.get(i).getId().equals(id)) {
						existConst = list.get(i);
					}
				}
				if (existConst != null) {
					if (value.equals(existConst.getValue())) {
						success = false;
						msg = "标识重复";
					}
					if (code.equals(existConst.getCode())) {
						success = false;
						msg = "编号重复";
					}
					if (!success) {
						result.put("success", success);
						result.put("msg", msg);
						return result;
					}
				}
			}
			
			oldConst = constDao.get(id);
		}
		String description = con.getDescription();
		if (description != null) {
			oldConst.setDescription(description);
		}
		oldConst.setType(type);
		oldConst.setUpdate_date(now);
		oldConst.setUpdated_by(created_by);
		oldConst.setValue(value);
		oldConst.setCode(code);
		
		constDao.save(oldConst);
		
		result.put("success", success);
		result.put("msg", msg);
		
		return result;
	}
	
}