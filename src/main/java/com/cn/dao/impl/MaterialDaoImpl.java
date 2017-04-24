package com.cn.dao.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.MaterialDao;
import com.cn.entity.Material;
import com.cn.vo.Page;

@Repository(value = "materialDao")
public class MaterialDaoImpl extends BaseDaoImpl<Material> implements MaterialDao {

	public MaterialDaoImpl() {
		super(Material.class);
	}

	@Override
	public Page getSimplePageByParam(Page page, Map<String, Object> map) {
		String sql = "from Material m where 1 = 1";
		for (Map.Entry<String, Object> entry : map.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			sql += " and " + key + " like '%" + value + "%'";
		}
		return getPageByQuery(sql, page);
	}

}