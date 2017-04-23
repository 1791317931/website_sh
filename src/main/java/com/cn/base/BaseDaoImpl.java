package com.cn.base;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;

import com.cn.util.Reflections;
import com.cn.vo.Page;

public class BaseDaoImpl<T extends IdEntity> implements BaseDao<T> {

	private Class<T> entityClass;
	@PersistenceContext
	private EntityManager entityManager;

	public BaseDaoImpl(Class<T> entityClass) {
		this.entityClass = Reflections.getClassGenricType(getClass());
	}

	// 获取Session
	public Session getSession() {
		return (Session) entityManager.getDelegate();
	}

	public void clear() {
		getSession().clear();
	}

	public void save(T entity) {
		getSession().save(entity);
	}

	public void delete(T entity) {
		getSession().delete(entity);
	}

	@SuppressWarnings("unchecked")
	public T get(int id) {
		return (T) getSession().get(entityClass, id);
	}

	public Object setParameter(Object string, Object... values) {
		if (string instanceof Query) {
			for (int i = 0; i < values.length; i++) {
				((Query) string).setParameter(i, values[i]);
			}
			return (Query) string;
		} else {
			for (int i = 0; i < values.length; i++) {
				((SQLQuery) string).setParameter(i, values[i]);
			}
			return (SQLQuery) string;
		}
	}

	// 通过query语句查询所有数据
	@SuppressWarnings({ "unchecked" })
	public List<T> getListByQuery(String queryString, Object... values) {
		return ((Query) setParameter(getSession().createQuery(queryString),	values)).list();
	}

	// 通过sql语句查询所有数据
	@SuppressWarnings({ "unchecked" })
	public List<T> getListBySql(String sqlString, Object... values) {
		return ((SQLQuery) setParameter(getSession().createSQLQuery(sqlString),	values)).addEntity(entityClass).list();
	}

	// 通过id删除数据
	public void delete(int id) {
		getSession().createQuery("delete from " + entityClass.getSimpleName() + " where id = ?").setParameter(0, id).executeUpdate();
	}

	// 获取所有数据
	@SuppressWarnings("unchecked")
	public List<T> getList() {
		return getSession().createQuery("from " + entityClass.getSimpleName()).list();
	}

	// query更新
	public void queryUpdate(String queryString, Object... values) {
		((Query) setParameter(getSession().createQuery(queryString), values)).executeUpdate();
	}

	// sql更新
	public void sqlUpdate(String sqlString, Object... values) {
		((SQLQuery) setParameter(getSession().createSQLQuery(sqlString), values)).executeUpdate();
	}

	// 通过query语句查询所有数据进行分页
	@SuppressWarnings("unchecked")
	public Page getPageByQuery(String queryString, Page page, Object... values) {
		int currentPage = page.getCurrentPage();
		int pageSize = page.getPageSize();
		List<T> list = ((Query) setParameter(getSession().createQuery(queryString), values))
				.setFirstResult((currentPage - 1) * pageSize)
				.setMaxResults(pageSize).list();
		return buildPage(page, countByQuery(queryString,values), list);
	}

	// 通过query语句查询所有数据条数
	public int countByQuery(String queryString, Object... values) {
		return ((Query) setParameter(getSession().createQuery(queryString),	values)).list().size();
	}

	// 通过sql语句查询所有数据进行分页
	@SuppressWarnings("unchecked")
	public Page getPageBySQL(String sqlString, Page page, Object... values) {
		int currentPage = page.getCurrentPage();
		int pageSize = page.getPageSize();
		List<T> list = ((SQLQuery) setParameter(getSession().createSQLQuery(sqlString), values))
				.addEntity(entityClass)
				.setFirstResult((currentPage - 1) * pageSize)
				.setMaxResults(pageSize).list();
		return buildPage(page, countBySQL(sqlString,values), list);
	}

	// 通过sql语句查询所有数据的条数
	public int countBySQL(String sqlString, Object... values) {
		return ((SQLQuery) setParameter(getSession().createSQLQuery(sqlString),	values)).list().size();
	}
	
	// 通过sql语句查询所有数据进行分页，不组装数据
	@SuppressWarnings("unchecked")
	public Page getPageObjBySQL(String sqlString, Page page, Object... values) {
		int currentPage = page.getCurrentPage();
		int pageSize = page.getPageSize();
		List<Object[]> list = ((SQLQuery) setParameter(getSession().createSQLQuery(sqlString), values))
				.setFirstResult((currentPage - 1) * pageSize)
				.setMaxResults(pageSize).list();
		return buildPageObj(page, countBySQL(sqlString,values), list);
	}

	// 通过Query语句查询表中所有数据进行分页
	@SuppressWarnings("unchecked")
	public Page getPage(Page page) {
		String queryString = "from " + entityClass.getSimpleName();
		int currentPage = page.getCurrentPage();
		int pageSize = page.getPageSize();
		List<T> list = ((Query) setParameter(getSession().createQuery(queryString)))
				.setFirstResult((currentPage - 1) * pageSize)
				.setMaxResults(pageSize).list();
		return buildPage(page, getList().size(), list);
	}

	// 设置Page属性
	public Page buildPage(Page page, int count, List<T> list) {
		page.setList(list);
		int pageSize = page.getPageSize();
		int totalPage = (int) Math.ceil(count * 1f / pageSize  * 1f);
		page.setTotalCount(count);
		page.setTotalPage(totalPage);
		return page;
	}
	
	// 设置Page属性，不组装数据
	public Page buildPageObj(Page page, int count, List<Object[]> list) {
		page.setList(list);
		int pageSize = page.getPageSize();
		int totalPage = (int) Math.ceil(count * 1f / pageSize  * 1f);
		page.setTotalCount(count);
		page.setTotalPage(totalPage);
		return page;
	}

}