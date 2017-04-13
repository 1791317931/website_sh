package com.cn.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.CategoryDao;
import com.cn.entity.Category;
import com.cn.vo.Page;

@Repository(value = "categoryDao")
public class CategoryDaoImpl extends BaseDaoImpl<Category> implements CategoryDao {

	public CategoryDaoImpl() {
		super(Category.class);
	}
	
	@Override
	public void deleteById(Integer categoryId) {
		String sql = "delete from w_category where id = ?";
		sqlUpdate(sql, categoryId);
	}

	@Override
	public Page getPageByParam(Page page, String name, Integer typeId, String isValid) {
		String sql = "from Category c where c.name like '%" + name + "%'";
		if(typeId != null) {
			sql += " and c.con.type_id = " + typeId;
		}
		if(isValid != null && isValid.length() > 0) {
			sql += " and c.is_valid = '" + isValid + "'";
		}
		return getPageByQuery(sql, page);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> getListByTypeCode(String type, Integer code) {
		String sql = "select c.id, c.name from w_category c"
					+ " left join w_const con on c.type_id = con.id"
					+ " where con.type = '" + type + "' and con.code = '" + code + "'";
		return getSession().createSQLQuery(sql).list();
	}

}