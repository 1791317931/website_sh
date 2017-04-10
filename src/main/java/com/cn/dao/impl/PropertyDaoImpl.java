package com.cn.dao.impl;

import org.springframework.stereotype.Repository;

import com.cn.base.BaseDaoImpl;
import com.cn.dao.PropertyDao;
import com.cn.entity.Property;
import com.cn.vo.Page;

@Repository(value = "propertyDao")
public class PropertyDaoImpl extends BaseDaoImpl<Property> implements PropertyDao {

	public PropertyDaoImpl() {
		super(Property.class);
	}

	@Override
	public Page getPage(Page page, Integer typeId) {
		String sql = "from Property p where p.is_valid = 'Y'";
		if(typeId != null) {
			sql += " and p.con.id = " + typeId;
		}
		return getPageByQuery(sql, page);
	}
	
	@Override
	public void updateBySql(Property property) {
		String sql = "update w_property set name = ?, type_id = ?, is_must = ?, updated_by = ?, update_date = now() where id = ?";
		sqlUpdate(sql, property.getName(), property.getCon().getId(), property.getIs_must(), property.getUpdated_by(), property.getId());
	}
	
	@Override
	public void deleteById(int id) {
		String sql = "delete from w_property where id = ?";
		sqlUpdate(sql, id);
	}
	
}