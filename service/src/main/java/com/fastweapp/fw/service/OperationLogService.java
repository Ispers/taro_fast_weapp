package com.fastweapp.fw.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fastweapp.fw.domain.Log;
import com.fastweapp.fw.domain.OperationLog;
import com.fastweapp.fw.domain.dto.OperationLogDto;
import com.fastweapp.fw.utils.PageResult;

public interface OperationLogService {
    void saveOperationLog(OperationLog operationLog);

    PageResult<Log> getOperationLog(Page<Log> page, OperationLogDto operationLogDto);
}
