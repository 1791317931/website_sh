package com.cn.dao.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.UserDao;
import com.cn.entity.User;
import com.cn.vo.Page;

@Repository(value = "userDao")
public class UserDaoImpl extends BaseDaoImpl<User> implements UserDao {

	public UserDaoImpl() {
		super(User.class);
	}
	
	public List<User> getByPhone(String valid, String phone, String password) {
		String sql = "from User u where u.is_valid = ? and u.phone = ? and u.password = ?";
		return getListByQuery(sql, valid, phone, password);
	}
	
	public int countByUsernameOrPhone(String valid, String username, String phone) {
		String sql = "select count(1) from w_user u where u.is_valid = ? and u.username = ? or u.phone = ?";
		return Integer.parseInt(getSession().createSQLQuery(sql)
				.setParameter(0, valid)
				.setParameter(1, username)
				.setParameter(2, phone)
				.uniqueResult() + "");
	}
	
	@Override
	public Page getPageByParam(Page page, String username, String phone,
			Integer typeId, String valid, String status) {
		String sql = "select *"
					+ " from w_user wu where 1 = 1";
		if (StringUtils.isNotBlank(username)) {
			sql += " and wu.username liek '%" + username + "%'";
		}
		if (StringUtils.isNotBlank(phone)) {
			sql += " and wu.phone like '%" + phone + "%'";
		}
		if (typeId != null) {
			sql += " and wu.type_id = " + typeId;
		}
		if (StringUtils.isNotBlank(valid)) {
			sql += " and wu.is_valid like '%" + valid + "%'";
		}
		if (StringUtils.isNotBlank(status)) {
			sql += " and wu.phone like '%" + status + "%'";
		}
		sql += " order by wu.update_date desc";
		return getPageBySQL(sql, page);
	}
	
	@Override
	public void updateByParam(int id, Map<String, Object> map) {
		String sql = "update w_user set ";
		boolean flag = false;
		for (Map.Entry<String, Object> entry : map.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			if (flag) {
				sql += ", " + key + " = '" + value + "'";
			} else {
				flag = true;
				sql += " " + key + " = '" + value + "'";
			}
		}
		sql += " where id = " + id;
		sqlUpdate(sql);
	}

}