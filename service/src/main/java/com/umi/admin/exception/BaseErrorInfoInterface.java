package com.umi.admin.exception;

/**
 * 服务接口类
 */
public interface BaseErrorInfoInterface {

    /**
     * 错误码
     */
    String getResultCode();

    /**
     * 错误描述
     */
    String getResultMsg();
}
