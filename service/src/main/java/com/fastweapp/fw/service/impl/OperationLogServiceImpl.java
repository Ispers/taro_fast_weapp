package com.fastweapp.fw.service.impl;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fastweapp.fw.domain.Log;
import com.fastweapp.fw.domain.OperationLog;
import com.fastweapp.fw.domain.dto.OperationLogDto;
import com.fastweapp.fw.mapper.OperationLogMapper;
import com.fastweapp.fw.service.OperationLogService;
import com.fastweapp.fw.utils.PageResult;
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

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void clearOperationLog() {
        operationLogMapper.deleteAllOperationLog();
    }
}
