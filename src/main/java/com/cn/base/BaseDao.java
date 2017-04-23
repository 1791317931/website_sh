package com.cn.base;

import java.util.List;

import com.cn.vo.Page;

public interface BaseDao<T> {

	void clear();
	
	void save(T entity);
	
	void delete(T entity);

	void delete(int id);

	T get(int id);

	List<T> getList();

	Object setParameter(Object string, Object... values);

	void queryUpdate(String queryString, Object... values);

	void sqlUpdate(String sqlString, Object... values);

	List<T> getListByQuery(String queryString, Object... values);

	List<T> getListBySql(String sqlString, Object... values);

	Page getPageByQuery(String queryString, Page page, Object... values);

	int countByQuery(String queryString, Object... values);

	Page getPageBySQL(String sqlString, Page page, Object... values);
	
	public Page getPageObjBySQL(String sqlString, Page page, Object... values);

	int countBySQL(String sqlString, Object... values);

	Page getPage(Page page);

	Page buildPage(Page page, int count, List<T> list);
	
	public Page buildPageObj(Page page, int count, List<Object[]> list);
}