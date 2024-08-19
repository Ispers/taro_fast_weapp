package com.umi.admin.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.umi.admin.domain.Log;
import com.umi.admin.domain.OperationLog;
import com.umi.admin.domain.dto.OperationLogDto;
import com.umi.admin.utils.PageResult;

public interface OperationLogService {
    void saveOperationLog(OperationLog operationLog);

    PageResult<Log> getOperationLog(Page<Log> page, OperationLogDto operationLogDto);
}
