package com.cn.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.dao.ConstObjDao;
import com.cn.entity.Const;
import com.cn.entity.ConstObj;
import com.cn.service.ConstObjService;
import com.cn.service.ConstService;
import com.cn.vo.ConstObjVO;

@Service(value = "constObjService")
public class ConstObjServiceImpl implements ConstObjService {

	@Resource(name = "constObjDao")
	private ConstObjDao constObjDao;
	
	@Resource(name = "constService")
	private ConstService constService;
	
	@Override
	public void saveOrUpdate(ConstObj constObj) {
		constObjDao.save(constObj);
	}

	@Override
	public void deleteByTypeId(int typeId) {
		constObjDao.deleteByTypeId(typeId);
	}
	
	@Override
	public void batchSave(int typeId, List<ConstObjVO> list, int created_by) {
		// 先删除typeId下所有ConstObj
		constObjDao.deleteByTypeId(typeId);
		
		if (list != null && list.size() > 0) {
			ConstObj constObj = null;
			Const con = constService.getById(typeId);
			Date now = new Date();
			for (int i = 0, length = list.size(); i < length; i++) {
				ConstObjVO vo = list.get(i);
				constObj = new ConstObj();
				constObj.setCon(con);
				constObj.setCreate_date(now);
				constObj.setUpdate_date(now);
				constObj.setCreated_by(created_by);
				constObj.setUpdated_by(created_by);
				constObj.setObj_id(vo.getObjId());
				constObj.setSort(vo.getSort());
				constObjDao.save(constObj);
			}
		}
	}

}