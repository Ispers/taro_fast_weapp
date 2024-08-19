package com.umi.admin.exception;

import com.umi.admin.utils.ResultResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * 自定义全局异常处理
 */
@ControllerAdvice
@Log4j2
public class GlobalExceptionHandler {
    /**
     * 处理自定义的业务异常
     */
    @ExceptionHandler(value = BadRequestException.class)
    @ResponseBody
    public ResultResponse<Object> bizExceptionHandler(HttpServletRequest req, BadRequestException e) {
        log.error("发生业务异常,原因是：{}", e.getErrorMsg());
        return ResultResponse.error(e.getErrorCode(), e.getErrorMsg());
    }

    /**
     * 处理空指针的异常
     */
    @ExceptionHandler(value = NullPointerException.class)
    @ResponseBody
    public ResultResponse<ExceptionEnum> exceptionHandler(HttpServletRequest req, NullPointerException e) {
        log.error("发生空指针异常，原因是:", e);
        return ResultResponse.error(ExceptionEnum.BODY_NOT_MATCH);
    }

    /**
     * 处理其他异常
     */
    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public ResultResponse<ExceptionEnum> exceptionHandler(HttpServletRequest req, Exception e) {
        log.error("未知异常，原因是:", e);
        return ResultResponse.error(ExceptionEnum.INTERNAL_SERVER_ERROR);
    }
}
