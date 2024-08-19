package com.umi.admin.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.umi.admin.domain.Log;
import com.umi.admin.domain.dto.OperationLogDto;
import com.umi.admin.service.OperationLogService;
import com.umi.admin.utils.PageResult;
import com.umi.admin.utils.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/log")
@RequiredArgsConstructor
public class LogController {
    private final OperationLogService operationLogService;

    @GetMapping("/getOperationLog")
    public ResultResponse<PageResult<Log>> getOperationLog(Page<Log> page, OperationLogDto operationLogDto) {
        PageResult<Log> res = operationLogService.getOperationLog(page, operationLogDto);
        return ResultResponse.success(res);
    }
}
