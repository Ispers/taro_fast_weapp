package com.umi.admin.service.impl;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.umi.admin.domain.Log;
import com.umi.admin.domain.OperationLog;
import com.umi.admin.domain.dto.OperationLogDto;
import com.umi.admin.mapper.OperationLogMapper;
import com.umi.admin.service.OperationLogService;
import com.umi.admin.utils.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OperationLogServiceImpl implements OperationLogService {
    @Autowired
    private OperationLogMapper operationLogMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveOperationLog(OperationLog operationLog) {
        operationLogMapper.insertOperationLog(operationLog);
    }

    @Override
    public PageResult<Log> getOperationLog(Page<Log> page, OperationLogDto operationLogDto) {
        IPage<Log> logPage = operationLogMapper.selectOperationLog(page, operationLogDto);
        return PageResult.get(logPage);
    }
}
