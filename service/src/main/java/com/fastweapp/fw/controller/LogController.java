package com.fastweapp.fw.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fastweapp.fw.domain.Log;
import com.fastweapp.fw.domain.dto.OperationLogDto;
import com.fastweapp.fw.service.OperationLogService;
import com.fastweapp.fw.utils.PageResult;
import com.fastweapp.fw.utils.ResultResponse;
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
