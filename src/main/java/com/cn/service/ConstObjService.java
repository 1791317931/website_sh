package com.cn.service;

import java.util.List;

import com.cn.entity.ConstObj;
import com.cn.vo.ConstObjVO;

public interface ConstObjService {
	
	public void saveOrUpdate(ConstObj constObj);

	public void deleteByTypeId(int typeId);
	
	public void batchSave(int typeId, List<ConstObjVO> list, int created_by);
	
}