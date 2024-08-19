package com.umi.admin.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.umi.admin.domain.Log;
import com.umi.admin.domain.OperationLog;
import com.umi.admin.domain.dto.OperationLogDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface OperationLogMapper {
    void insertOperationLog(OperationLog operationLog);

    IPage<Log> selectOperationLog(Page<Log> page, @Param("operationLogDto") OperationLogDto operationLogDto);
}
