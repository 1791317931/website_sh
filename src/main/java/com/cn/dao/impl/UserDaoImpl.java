package com.cn.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.UserDao;
import com.cn.entity.User;

@Repository(value = "userDao")
public class UserDaoImpl extends BaseDaoImpl<User> implements UserDao {

	public UserDaoImpl() {
		super(User.class);
	}
	
	public List<User> getByPhone(String phone, String password) {
		String sql = "from User u where u.phone = ? and u.password = ?";
		return getListByQuery(sql, phone, password);
	}
	
	public int countByUsernameOrPhone(String username, String phone) {
		String sql = "select count(1) from w_user u where u.username = ? or u.phone = ?";
		return Integer.parseInt(getSession().createSQLQuery(sql).setParameter(0, username).setParameter(1, phone).uniqueResult() + "");
	}

}