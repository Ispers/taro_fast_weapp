package com.fastweapp.fw.utils;

import com.alibaba.fastjson.JSONObject;
import com.fastweapp.fw.exception.BaseErrorInfoInterface;
import com.fastweapp.fw.exception.ExceptionEnum;
import lombok.Getter;
import lombok.Setter;

/**
 * 自定义数据传输
 */
@Setter
@Getter
public class ResultResponse<T> {
    /**
     * 响应代码
     */
    private String code;

    /**
     * 响应消息
     */
    private String message;

    /**
     * 响应结果
     */
    private T result;

    public ResultResponse() {
    }

    public ResultResponse(BaseErrorInfoInterface errorInfo) {
        this.code = errorInfo.getResultCode();
        this.message = errorInfo.getResultMsg();
    }

    /**
     * 成功
     */
    public static <T> ResultResponse<T> success() {
        return success(null);
    }

    public static <T> ResultResponse<T> success(String message, T data) {
        ResultResponse<T> rb = new ResultResponse<>();
        rb.setCode(ExceptionEnum.SUCCESS.getResultCode());
        rb.setMessage(message);
        rb.setResult(data);
        return rb;
    }


    /**
     * 成功
     */
    public static <T> ResultResponse<T> success(T data) {
        ResultResponse<T> rb = new ResultResponse<>();
        rb.setCode(ExceptionEnum.SUCCESS.getResultCode());
        rb.setMessage(ExceptionEnum.SUCCESS.getResultMsg());
        rb.setResult(data);
        return rb;
    }

    /**
     * 失败
     */
    public static <T> ResultResponse<T> error(BaseErrorInfoInterface errorInfo) {
        ResultResponse<T> rb = new ResultResponse<>();
        rb.setCode(errorInfo.getResultCode());
        rb.setMessage(errorInfo.getResultMsg());
        rb.setResult(null);
        return rb;
    }

    /**
     * 失败
     */
    public static <T> ResultResponse<T> error(String code, String message) {
        ResultResponse<T> rb = new ResultResponse<>();
        rb.setCode(code);
        rb.setMessage(message);
        rb.setResult(null);
        return rb;
    }

    /**
     * 失败
     */
    public static <T> ResultResponse<T> error(String message) {
        ResultResponse<T> rb = new ResultResponse<>();
        rb.setCode("-1");
        rb.setMessage(message);
        rb.setResult(null);
        return rb;
    }

    @Override
    public String toString() {
        return JSONObject.toJSONString(this);
    }
}
